import Head from 'next/head'
import Image from 'next/image'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/Home.module.css'

const Home = ({settings}) => {

    let render = {
        _id: null,
        act: null,
        tipe_tamu: null,
    };

    const router = useRouter();
    if (typeof router.query._id !== 'undefined') {
        render._id = router.query._id;
    }
    if (typeof router.query.act !== 'undefined') {
        render.act = router.query.act;
    }
    if (typeof router.query.tipe_tamu !== 'undefined') {
        render.tipe_tamu = router.query.tipe_tamu;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Buku Tamu {settings.nama_perumahan}</title>
                <meta name="description" content="Digital guest book app for every occasions."/>
                <meta name="author" content="Didit Velliz <diditvelliz@gmail.com>"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <section className="container">
                <h1 className="text-3xl font-bold underline">Buku Tamu {settings.nama_perumahan}</h1>
                <p className="">Kepada Yth {render.tipe_tamu} ...</p>
                <hr/>
                <div>
                    <input type="text"/>
                    <select name="" id="">
                        <option value="1">Blok 1</option>
                        <option value="2">Blok 2</option>
                        <option value="3">Blok 3</option>
                        <option value="4">Blok 4</option>
                    </select>
                    <select name="" id="">
                        <option value="1">No 1</option>
                    </select>
                </div>
            </section>

            <footer className={styles.footer}>
                <a href="https://github.com/kukoding"
                   target="_blank"
                   rel="noopener noreferrer">
                    Ditenagai oleh sumber terbuka &copy; 2022 digital-guest-book
                </a>
            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            settings: {
                nama_perumahan: "Perumahan Sariwangi Village"
            }
        }
    }
}

export default Home;
