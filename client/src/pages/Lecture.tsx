import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Layout from "./Layout";
import { Backdrop, CircularProgress, Box, Grid, Typography } from "@mui/material";
import QRCode from "qrcode";
import { fetchAuth, LectureType } from "../utils/globals";
import { User } from "../components/User";
import { getUser } from "../utils/auth";
import { User as UserType } from "../utils/auth";
import { useAlert } from "react-alert";
import { Attend, LectureLoader } from "../router";

export default function Lecture() {
  let { lecture, ...data } = useLoaderData() as LectureLoader;
  const [present, setPresent] = useState(data.present);
  const [allPresent, setAllPresent] = useState(data.allPresent);

  console.log(allPresent);
  const qrCodeRef = useRef(null);
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const alert = useAlert();
  const { user } = getUser()!;

  const generateQr = () => {
    const wrapperWidth = canvasWrapper.current?.getBoundingClientRect().width;
    const responsiveWidth = Math.min(320, wrapperWidth ? wrapperWidth / 1.3 : 600);
    QRCode.toCanvas(
      qrCodeRef.current,
      window.location.href,
      { width: responsiveWidth },
      function (error) {
        if (error) console.error(error);
      }
    );
  };

  const markPresent = async () => {
    if (present) return;
    const body = JSON.stringify({ lecture: lecture.id, student: user.id });
    const res = await fetchAuth("mark-present/", { method: "POST", body });

    if (res.status === 201) {
      const data = await res.json();
      alert.success("You have been marked present");
      setPresent(true);
      setAllPresent((p) => [...p, data]);
    } else {
      try {
        const res_data = await res.json();
        if (typeof res_data === "object") {
          Object.keys(res_data).forEach((key) => {
            alert.error(`${key}: ${res_data[key]}`);
          });
        } else {
          alert.error(res_data);
        }
      } catch (error) {
        alert.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (qrCodeRef.current) generateQr();
  }, [qrCodeRef.current]);

  useEffect(() => {
    setTimeout(markPresent, 1000);
  }, []);

  return (
    <Layout>
      <Grid container height="100dvh">
        <SidePanel lecture={lecture} user={user} present={allPresent} />
        <Grid
          item
          xs={12}
          sm={6}
          md={8}
          order={{ xs: 1, sm: 2 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          alignSelf="center"
          ref={canvasWrapper}
        >
          <canvas ref={qrCodeRef} style={{ width: "600px" }} />
          <Typography>Scan me to mark present</Typography>
        </Grid>
      </Grid>
      <BlurredOverlayWithSpinner present={present} text={"We are marking you present"} />
    </Layout>
  );
}

const SidePanel = ({
  lecture,
  user,
  present,
}: {
  lecture: Partial<LectureType>;
  user: UserType;
  present: Attend[];
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} order={{ xs: 2, sm: 1 }} sx={{ backgroundColor: "#f2f2f2" }}>
      <Box p={2}>
        <Typography variant="h5" lineHeight={1.7}>
          {lecture.code}
        </Typography>
        <Typography pb={1} lineHeight={1.2}>
          {lecture.name}
        </Typography>
        <User user={lecture.lecturer} />
      </Box>
      <Box px={2}>
        <Typography variant="h5" fontSize={20} lineHeight={1.8}>
          Present
        </Typography>
        {present.length > 0 ? (
          <Box display="grid" gap={1}>
            {present.map((p) => (
              <User user={p.student} key={p.student.id} />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" lineHeight={1}>
            No one in class yet, please ask students to scan the QR Code
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

const BlurredOverlayWithSpinner = ({ present, text }: { present: boolean; text: string }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above other content
        backdropFilter: "blur(10px)", // Apply the blur effect
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      }}
      open={!present} // Control when the backdrop is open or closed
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="inherit" /> {/* Spinner in the center */}
        <Typography variant="body2" fontWeight={500} textAlign="center">
          Please Hold <br />
          {text}
        </Typography>
      </Box>
    </Backdrop>
  );
};
