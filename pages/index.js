import Head from 'next/head'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {_apiCreateGuests, _apiUpdateGuests} from "../util/ajax/GuestsService"
import Image from "next/image";

const Home = ({settings}) => {

    let render = {
        _id: null,
        act: null,
        tipe_tamu: null,
    };

    const router = useRouter();
    if (typeof router.query.tipe_tamu !== 'undefined') {
        render.tipe_tamu = router.query.tipe_tamu;
    }

    const [viewState, setViewState] = useState('create');

    const [namaTamu, setNamaTamu] = useState('');
    const [blok, setBlok] = useState('0');
    const [no, setNo] = useState('0');

    const saveGuestData = async () => {
        loading_show();
        if (blok === '0') {
            alert('Silahkan untuk pilih Blok rumah yang dikunjungi.');
            loading_hide();
            return false;
        }
        if (no === '0') {
            alert('Silahkan untuk pilih No rumah yang dikunjungi.');
            loading_hide();
            return false;
        }

        let data = {
            nama_perumahan: settings.nama_perumahan,
            nama_tamu: namaTamu,
            alamat_rumah: {
                blok: blok,
                nomor: no
            }
        };

        let result = await _apiCreateGuests(data, render.tipe_tamu);
        if (result === undefined || result === false) {
            alert('Gagal menghubungkan. Periksa kembali koneksi internet anda.');
            return false;
        }

        localStorage.setItem('_id', result.insertedId);
        localStorage.setItem('nama_tamu', namaTamu);
        localStorage.setItem('blok', blok);
        localStorage.setItem('no', no);

        setViewState('view');
        loading_hide();
    }

    const removeGuestData = async () => {
        loading_show();

        //update api call
        let _id = localStorage.getItem('_id');
        let result = await _apiUpdateGuests(_id);
        if (result === undefined || result === false) {
            alert('Gagal menghubungkan. Periksa kembali koneksi internet anda.');
            loading_hide();
            return false;
        }

        localStorage.clear();
        setViewState('create');
        loading_hide();
    }

    useEffect(() => {
        loading_show();

        let _id = localStorage.getItem('_id');
        if (_id === null) {
            loading_hide();
            setViewState('create');
        } else {
            const load = async () => {
                let nama_tamu = localStorage.getItem('nama_tamu');
                let blok = localStorage.getItem('blok');
                let no = localStorage.getItem('no');

                setNamaTamu(nama_tamu);
                setBlok(blok);
                setNo(no);
            }
            load().then(() => {
                loading_hide();
                setViewState('view');
            });
        }
    }, []);

    function loading_show() {
        document.getElementById("spinner").classList.add("show");
    }

    function loading_hide() {
        document.getElementById("spinner").classList.remove("show");
    }

    return (
        <div>
            <Head>
                <title>Buku Tamu {settings.nama_perumahan}</title>
                <meta name="description" content="Digital guest book app for every occasions."/>
                <meta name="author" content="Didit Velliz <diditvelliz@gmail.com>"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <nav
                className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100
                text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
                <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                    <div className="container-fluid">
                        <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1"
                           href="#">
                            <span className="font-medium">Buku Tamu - {settings.nama_perumahan}</span>
                        </a>
                    </div>
                </div>
            </nav>

            <div id="spinner">
                <Image src={require('/public/image/ajax_loader.gif')} alt="loading..." width="25" height="25"/>
            </div>

            {viewState === 'create'
                ?
                <div className="container mx-auto">
                    <p className="p-5">Kepada Yth: <b>Tamu {settings.nama_perumahan}</b>. <br/> Untuk kenyamanan
                        bersama,
                        dimohon untuk melengkapi
                        data anda sebagai tamu. Terima kasih.</p>
                    <hr/>
                    <div className="m-5">
                        <input type="text" placeholder="Nama Anda" className="form-control block w-full px-3 py-1.5 text-base font-normal
                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               value={namaTamu} onChange={e => setNamaTamu(e.target.value)}/>
                        <p className="py-1.5 text-gray-700">Rumah Tujuan:</p>
                        <select name="" id="" className="form-control block w-full px-3 py-1.5 text-base font-normal mb-2
                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                value={blok} onChange={e => setBlok(e.target.value)}>
                            <option value="0">Pilih Blok</option>
                            <option value="1">Blok 1</option>
                            <option value="2">Blok 2</option>
                            <option value="3">Blok 3</option>
                            <option value="4">Blok 4</option>
                        </select>
                        <select name="" id="" className="form-control block w-full px-3 py-1.5 text-base font-normal mb-5
                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                value={no} onChange={e => setNo(e.target.value)}>
                            <option value="0">Pilih No</option>
                            <option value="1">No 1</option>
                            <option value="2">No 2</option>
                            <option value="3">No 3</option>
                            <option value="4">No 4</option>
                            <option value="5">No 5</option>
                            <option value="6">No 6</option>
                            <option value="7">No 7</option>
                            <option value="8">No 8</option>
                            <option value="9">No 9</option>
                            <option value="10">No 10</option>
                            <option value="11">No 11</option>
                            <option value="12">No 12</option>
                            <option value="13">No 13</option>
                            <option value="14">No 14</option>
                            <option value="15">No 15</option>
                            <option value="16">No 16</option>
                            <option value="17">No 17</option>
                            <option value="18">No 18</option>
                            <option value="19">No 19</option>
                            <option value="20">No 20</option>
                            <option value="21">No 21</option>
                            <option value="22">No 22</option>
                            <option value="23">No 23</option>
                            <option value="24">No 24</option>
                            <option value="25">No 25</option>
                            <option value="26">No 26</option>
                            <option value="27">No 27</option>
                            <option value="28">No 28</option>
                            <option value="29">No 29</option>
                            <option value="30">No 30</option>
                            <option value="31">No 31</option>
                            <option value="32">No 32</option>
                            <option value="33">No 33</option>
                            <option value="34">No 34</option>
                            <option value="35">No 35</option>
                            <option value="36">No 36</option>
                            <option value="37">No 37</option>
                            <option value="38">No 38</option>
                            <option value="39">No 39</option>
                            <option value="40">No 40</option>
                        </select>
                        <button onClick={saveGuestData} type="button" className="w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs
                    leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600
                    focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition
                    duration-150 ease-in-out">SIMPAN
                        </button>
                    </div>
                </div>
                :
                <div className="container mx-auto">
                    <Image src={require('/public/image/green-checklist.png')} alt="loading..." width="250" height="250" className="m-5 p-5"/>
                    <p className="p-5">Kepada Yth: <b>{namaTamu}</b><br/>Terima kasih telah mengisi buku tamu.</p>
                    <p className="px-5 pb-5">Anda sedang bertamu ke Rumah <b>Blok {blok} No {no}</b></p>
                    <hr/>
                    <div className="m-5">
                        <button onClick={removeGuestData} type="button" className="w-full inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs
                            leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition
                            duration-150 ease-in-out">KELUAR
                        </button>
                    </div>
                </div>
            }


            <footer className="bg-emerald-50 text-center lg:text-left">
                <div className="text-gray-700 text-center p-4">
                    Ditenagai oleh sumber terbuka &copy; 2022
                    <a href="https://github.com/kukoding"
                       target="_blank"
                       rel="noopener noreferrer">
                        <span className="text-blue-700"> digital-guest-book </span>
                    </a>
                </div>
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
