import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";

const Home = () => {

    const [whoUses, setWhoUses] = useState()

    useEffect(() => {
        fetch('/users.json')
            .then(res => res.json())
            .then(data => {
                setWhoUses(data)
            })
    }, [whoUses])

    return (
        <div>
            <Banner></Banner>
            <div className="bg-slate-200">

                <h2 className="text-center text-4xl py-10 text-[#2f6fa3] font-bold">Who Benefits?</h2>
                <div data-aos="zoom-in" className="grid pb-10 lg:grid-cols-3 md:grid-cols-2 mx-10 grid-cols-1 gap-10 lg:mx-auto max-w-6xl">
                    {
                        whoUses?.map(whoUse => <div key={whoUse.benefit_1} className="card glass hover:bg-gray-500">
                            <figure><img src={whoUse.image} alt="car!" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{whoUse.profession}</h2>
                                <p>{whoUse.benefit_1}</p>
                                <p>{whoUse.benefit_2}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Home;