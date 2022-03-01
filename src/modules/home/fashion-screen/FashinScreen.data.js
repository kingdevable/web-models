const getImagePath = (imageName)=>{
    return `images/fashion-screen/${imageName}.png`;
}

const column1Images = [
    {
        imageSrc: getImagePath('pink-jacket'),
        imageId: 1.1,
        containerStyle: {height: 400 + 400},
        imageStyle: {width: 500, marginBottom: 400},
    },
    {
        imageSrc: getImagePath('hoodie'),
        imageId: 1.3,
        containerStyle: {height: 340 + 400},
        imageStyle: {width: 335, left: -20, marginBottom: 400}
    },
    {
        imageSrc: getImagePath('army-helmet'),
        imageId: 1.4,
        containerStyle: {height: 463, paddingBottom: 200},
        imageStyle: {width: 463,  left: '-20%', mobileTop: '90%'},
    }
];

const column2Images = [
    {
        imageSrc: getImagePath('shoes'),
        imageId: 2.1,
        containerStyle: {height: 140 + 300},
        imageStyle: {width: 313, top: 20, mobileTop: '70%', left: '30%', marginBottom: 300},
    },
    {
        imageSrc: getImagePath('nope-shirt'),
        imageId: 2.2,
        containerStyle: {height: 250 + 200},
        imageStyle: {marginBottom: 200, width: 363, left: 0},
    },
    {
        imageSrc: getImagePath('asian-dress'),
        imageId: 2.3,
        containerStyle: {height: 400, paddingBottom: 300},
        imageStyle: {width: 400, left: '-30%', mobileTop: '70%'},
    },
    {
        imageSrc: getImagePath('white-t-shirt'),
        imageId: 2.4,
        containerStyle: {height: 400, paddingBottom: 100},
        imageStyle: {width: 363, left: 30, mobileTop: '20%'},
    }
]

const column3Images = [
    {
        imageSrc: getImagePath('snickers'),
        imageId: 3.1,
        containerStyle: {height: 153+ 200 + 300},
        imageStyle: {width: 430, left: '20%', marginTop: 200, marginBottom: 300}
    },
    {
        imageSrc: getImagePath('lady-dress'),
        imageId: 3.2,
        containerStyle: {height: 588+200},
        imageStyle: {marginBottom: 200, width: 230, left: 30},
    },
    {
        imageSrc: getImagePath('bag'),
        imageId: 3.4,
        containerStyle: {height: 200 + 200},
        imageStyle: {marginBottom: 200, width: 301, right: 0},
    },
    {
        imageSrc: getImagePath('mask'),
        imageId: 3.5,
        containerStyle: {height: 272 + 100},
        imageStyle: {marginBottom: 100, width: 290, left: '30%'},
    }
]

export const imageList = {
    column1: column1Images,
    column2: column2Images,
    column3: column3Images
};

export const triggers = [0, 0.25, 0.5, 0.75];
