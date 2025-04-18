import { NextResponse } from 'next/server';


const generateFishData = (random) => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: i + 1,
            url: `https://100pics.netlify.app/api/images/fish/image_${i + 1}.jpg`
        })
    }

    //--------- Check random ---------------------------
    if (random) {
        const createRandomId = new Set();
        while (createRandomId.size < data.length) { 
            const randomDigit = Math.floor(Math.random() * data.length) + 1;
            createRandomId.add(randomDigit);
        }
        const uniqueData = Array.from(createRandomId).map(unique => {
            return data.find(item => item.id === unique);
        });

        return uniqueData;
    } else {
        return data;
    }
}



export const GET = async (request) => {
    try {
        // http://localhost:3000/api/fish?limit=4&random=true
        const searchParams = request.nextUrl.searchParams;
        const searchLimit = searchParams.get('limit');
        const searchRandom = searchParams.get('random');
        // console.log(searchLimit, searchRandom);

        let numLimit = undefined; // Initialize as undefined

        if (searchLimit) {
            const parsedLimit = parseInt(searchLimit, 10);
            console.log(parsedLimit)
            if (!isNaN(parsedLimit) && Number.isInteger(parsedLimit) && parsedLimit > 0) {
                numLimit = parsedLimit;
            } else {
                console.warn("Invalid 'limit' parameter. Ignoring limit.");
                numLimit = undefined; // Ensure no limit is applied
            }
        }

        const generateData = generateFishData(searchRandom === 'true' ? true : false);
        if (numLimit) {
            const data = generateData.slice(0, numLimit);
            return NextResponse.json({
                message: "Data is fetching successfully.",
                data,
            }, { status: 200 });

        } else {
            return NextResponse.json({
                message: "Data is fetching successfully.",
                data: generateData,
            }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An error occurred while fetching data.",
            data: [],
        }, { status: 500 });
    }
}



