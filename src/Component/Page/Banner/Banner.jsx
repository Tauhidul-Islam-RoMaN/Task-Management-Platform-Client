import { Parallax } from 'react-parallax';
import img from '../../../assets/banner.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {

    return (
        <Parallax
            blur={{ min: -50, max: 30 }}
            bgImage={img}
            bgImageAlt="Banner"
            strength={-200}
        >
            <div className="lg:h-[1020px] text-white text-center md:h-[730px] grid h-[240px] bg-contain lg:bg-cover bg-no-repeat">
                <div className="col-start-1 row-start-1 bg-black bg-opacity-60 w-full lg:h-[1050px]  md:h-[760px] grid h-[280px]"></div>
                <div className="col-start-1 flex items-center justify-center row-start-1 mx-auto">
                    <div className="flex-1">
                    </div>
                    <div className="flex-1 ">
                        <h2 className="lg:text-5xl md:text-4xl text-lg mb-2 md:mb-6 ">TaskFlowHub <br /> Your Tasks, Your Way. Elevate Productivity, Simplify Management!</h2>
                        <Link to='/dashboard'><button className='btn btn-warning'>Let’s Explore</button></Link>
                        <div className="w-4/5 mx-auto flex gap-0">
                        </div>
                    </div>
                </div>

            </div>
        // </Parallax>
    );
};

export default Banner;