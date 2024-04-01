import Image from "next/image";
import Demo from "./components/demo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-cyan-500 to-blue-700 p-4">
      <header className="text-center mb-10 text-white flex items-center justify-center">
        <Image
          src="https://yt3.googleusercontent.com/4zz2NOh2_h7C6ZLaCRBrId3cViOY0AeGU9W9JGSdKlTt3ri1UxIgiboyG4k72y2OJTTlTErXoQ=s900-c-k-c0x00ffffff-no-rj"
          alt="kits.ai Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h1 className="text-4xl font-bold ml-4">kits.ai Demo</h1>
      </header>

      <Demo />

      <footer className="text-center text-white mt-10">
        Made by: <b>Gabriel dos Reis Morales</b>
      </footer>
      <ToastContainer />
    </main>
  );
}
