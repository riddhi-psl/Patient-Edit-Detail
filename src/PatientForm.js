import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import { MdClose } from "react-icons/md";


function App() {

    //for snackBar
    const [showSnackbar, setShowSnackbar] = useState(false);

    // const {pid} = useParams();
    const { pid } = useParams();

    const [condition, setCondition] = useState(false);

    const [name, setName] = useState("")

    const [address, setAddress] = useState("")

    const [bGroup, setBGroup] = useState('')

    const [contact, setContact] = useState('')

    const [gender, setGender] = useState('')

    const [age, setAge] = useState('')

    const [majorDiseases, setMajorDiseases] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response2 } = await axios.get("http://localhost:7557/api/AddPatient");
                setName(response2[pid - 1].Name)
                setAddress(response2[pid - 1].City)
                setBGroup(response2[pid - 1].Blood_Group)
                setContact(response2[pid - 1].Contact)
                setGender(response2[pid - 1].Gender)
                setMajorDiseases(response2[pid - 1].Major_Disease)
                setAge(response2[pid - 1].Age)

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, [pid]);

    // console.log(bGroup);
    // console.log(address);
    // console.log(contact);
    // console.log(majorDiseases);
    // console.log(typeof (gender));

    let Gender = gender.toLocaleLowerCase();


    const handleSubmit = async (e) => {

        setShowSnackbar(true);

        e.preventDefault();

        try {
            const res = await axios.put('http://localhost:7557/api/AddPatient',
                {

                    Name: name,
                    City: address,
                    Contact: contact,
                    Age: age,
                    Gender: gender,
                    Blood_Group: bGroup,
                    Major_Disease: majorDiseases,
                    pid: pid,

                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        'Accept': 'application/json; charset=utf-8'
                    },
                }
            );
            console.log(res);
        } catch (error) {
            console.error(error.message);
        };

        window.chrome.webview.postMessage("true");

    }

    function handleCloseSnackbar() {
        setShowSnackbar(false);
    }

    return (
        <main className='App'>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <div className="snackbar">
                    <h2>Thank you! We have received your message.</h2>
                    <button onClick={handleCloseSnackbar} className="close_btn">
                        <MdClose />
                    </button>
                </div>
            </Snackbar>
            <section>
                <form action="" onSubmit={handleSubmit} >
                    <h1>Personal Information </h1>
                    <section className='Personal__info'>

                        <section>

                            <div className='input_field'>
                                <label>Patient Name</label>
                                <input type="text"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>

                            <div className='input_field'>
                                <label htmlFor="address">Address</label>
                                <input type="text"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </div>

                            <div className='input_field'>
                                <label >Contact Number</label>
                                <input type="text"
                                    value={contact}
                                    onChange={(e) => { setContact(e.target.value) }}
                                />
                            </div>

                            <div className='input_field'>
                                <label >Age</label>
                                <input type="text"
                                    value={age}
                                    onChange={(e) => { setAge(e.target.value) }}
                                />
                            </div>

                        </section>

                        <section>

                            <div className='input_field'>
                                <label >Blood Group</label>
                                <input type="text"
                                    value={bGroup}
                                    onChange={(e) => { setBGroup(e.target.value) }}
                                />
                            </div>

                            <div className='input_field'>
                                <label>gender</label>

                                <div className='radio_btn'>
                                    <input type="radio" id="male" name="gender"
                                        checked={Gender === "male"}
                                        value="male"
                                        onChange={(e) => { setGender(e.target.value) }}
                                    />
                                    <label for="male">Male</label>

                                    <input type="radio" id="female" name="gender"
                                        checked={Gender === "female"}
                                        value="female"
                                        onChange={(e) => { setGender(e.target.value) }}
                                    />
                                    <label for="male">female</label>
                                </div>

                            </div>

                            <div className='input_field'>
                                <label>Any Observation</label>
                                <input type="text"
                                    value={majorDiseases}
                                    onChange={(e) => { setMajorDiseases(e.target.value) }} />
                            </div>
                        </section>

                    </section>


                    <button type="submit" className='submit_btn'>Submit</button>

                </form>

            </section>
        </main>
    );
}

export default App;
