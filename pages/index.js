import Head from "next/head";
import styles from "../styles/Home.module.css";
import { withPublic } from '../src/hook/route';
import { Button } from "@chakra-ui/button";



function Home({auth}) {
  const{loginWithGoogle,error} =auth;
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
            <Button onClick={loginWithGoogle}>Login</Button>
        </div>

       
      </main>

      {/* <footer className={styles.footer}>
        <h1></h1>
      </footer> */}
    </div>
  );
}
export default withPublic(Home);