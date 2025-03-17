"use client"
import upload from '@/assests/info/upload-prescription.png';
import pngwing from '@/assests/info/pngwing.png';
import help from '@/assests/info/help-line.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const infoObj = [
    {
        title: 'Upload Prescription',
        img: upload,
        buttonText: 'Upload Now',
        buttonColor: 'bg-cyan-950',
        link: '/'
    },
    {
        title: 'Healthcare Products',
        img: pngwing,
        buttonText: 'Order Now',
        buttonColor: 'bg-yellow-950',
        link: '/shop'
    },
    {
        title: 'Help Line',
        img: help,
        buttonText: 'Call Now',
        buttonColor: 'bg-blue-950',
        link: '/contact'
    }
];

const Info = () => {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                {infoObj.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-6 bg-white p-6 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 border"
                    >
                        <div className="text-start">
                            <h1 className="text-xl font-semibold mb-4">{item.title}</h1>
                            <a href={item.link}>
                                <Button
                                    className={`${item.buttonColor} text-white hover:opacity-90 transition-opacity duration-300 cursor-pointer rounded`}
                                >
                                    {item.buttonText}
                                </Button>
                            </a>
                        </div>
                        <Image
                            src={item.img}
                            alt={item.title}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default Info;
