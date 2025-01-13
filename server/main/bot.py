import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

def askAI(question, context=""):
  genai.configure(api_key=api_key)
  model = genai.GenerativeModel("gemini-1.5-flash")

  return model.generate_content("You should function as a teacher. Use the following as context to what you and the user have been talking about in past messages. also use the context to help in answering the question. context :" + context + ". This is a new message from the user. message: "+ question + ".Note Your reply should not contain the exact syntax of the context")

print(askAI("hi"))