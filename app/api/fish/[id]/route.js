import { NextResponse } from 'next/server';

const generateFishData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: i + 1,
            url: `${process.env.NEXT_PUBLIC_HOST_NAME}/images/fish/image_${i + 1}.jpg`
        })
    }
    return data;
}


export const GET = async (request, { params }) => {
    try {

        const { id } = await params;
        const parsedId = parseInt(id);



        if (!parsedId) {
            return NextResponse.json({ message: "Missing document ID." }, { status: 400 });
        }


        const generateData = generateFishData();
        const searcId = parsedId > 100 ? 1 : parsedId;

        const data = generateData.find(item => item.id === searcId);

        return NextResponse.json({
            message: "Data is fetching successfully.",
            data,
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating document: ', error);
        let message = "Failed to update data.";
        let errorCode = "UNKNOWN_ERROR";
        let status = 500;

        if (error instanceof Error) {
            message = error.message;
        }

        if (error.code === 'INVALID_ARGUMENT') {
            message = "Invalid data argument provided.";
            errorCode = "INVALID_ARGUMENT";
            status = 400;
        }
        return NextResponse.json({ message, error: errorCode }, { status });

    }
};

