import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link"
import { withPublic } from '../src/hook/route';


function Home({auth}) {
  const{user,loginWithGoogle,error} =auth;
  return (
    <div className={styles.container}>
      <Head>
        <title>Omuse</title>
        <meta name="description" content="A multi user music platform"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Omuse!</a>
        </h1>
        
        <div>
            {error &&<h1>{error}</h1>}
            <button onClick={loginWithGoogle}>login</button>
        </div>

       
      </main>

      <footer className={styles.footer}>
        <h1></h1>
      </footer>
    </div>
  );
}
export default withPublic(Home);