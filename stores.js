const stores = [
    {
        name: 'Leeds',
        address: 'Unit 12, Kirkstall Retail Park, Leeds LS4 2AZ',
        location: { lat: 53.8120, lng: -1.5849 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Spacious store with new oak collections',
        thumbnail: 'Media/StoreFinderImage_Leeds.jpg',
        phone: '01132 456700',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Bristol',
        address: 'Unit 5, Cribbs Causeway Retail Park, Bristol BS10 7SR',
        location: { lat: 51.5192, lng: -2.6051 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Modern furniture displays across two floors',
        thumbnail: 'Media/StoreFinderImage_Bristol.jpg',
        phone: '01179 820500',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Nottingham',
        address: 'Retail Park Way, Nottingham NG2 1NA',
        location: { lat: 52.9390, lng: -1.1496 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Features our exclusive handmade oak range',
        thumbnail: 'Media/StoreFinderImage_Nottingham.jpg',
        phone: '01158 220310',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Manchester',
        address: 'Unit 9, Trafford Retail Park, Manchester M41 7FP',
        location: { lat: 53.4687, lng: -2.3494 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Award-winning layout with design consultation area',
        thumbnail: 'Media/StoreFinderImage_Manchester.jpg',
        phone: '01618 934820',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'London Tottenham',
        address: '42 High Road, Tottenham, London N15 6BP',
        location: { lat: 51.5862, lng: -0.0711 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Compact city store showcasing small-space solutions',
        thumbnail: 'Media/StoreFinderImage_LondonTottenham.jpg',
        phone: '02083 905670',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Southampton',
        address: 'Unit 4, West Quay Retail Park, Southampton SO15 1BA',
        location: { lat: 50.9040, lng: -1.4114 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'One of our largest southern locations',
        thumbnail: 'Media/StoreFinderImage_Southampton.jpg',
        phone: '02380 990410',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Sheffield',
        address: 'Unit 7, Meadowhall Retail Park, Sheffield S9 2YZ',
        location: { lat: 53.4144, lng: -1.4125 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Includes our signature home inspiration centre',
        thumbnail: 'Media/StoreFinderImage_Sheffield.jpg',
        phone: '01142 870950',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Norwich',
        address: 'Unit 3, Riverside Retail Park, Norwich NR1 1WT',
        location: { lat: 52.6257, lng: 1.3074 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Modern design zone and clearance outlet',
        thumbnail: 'Media/StoreFinderImage_Norwich.jpg',
        phone: '01603 770240',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Cambridge',
        address: 'Retail Park South, Cambridge CB1 7DY',
        location: { lat: 52.1889, lng: 0.1570 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Stylish new showroom in the university city',
        thumbnail: 'Media/StoreFinderImage_Cambridge.jpg',
        phone: '01223 554980',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Cardiff',
        address: 'Unit 8, Cardiff Bay Retail Park, Cardiff CF11 0JR',
        location: { lat: 51.4490, lng: -3.1808 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Welsh flagship with coastal oak collections',
        thumbnail: 'Media/StoreFinderImage_Cardiff.jpg',
        phone: '02920 987410',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Exeter',
        address: 'Marsh Barton Road, Exeter EX2 8QW',
        location: { lat: 50.7054, lng: -3.5275 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Rustic oak range displayed in a modern space',
        thumbnail: 'Media/StoreFinderImage_Exeter.jpg',
        phone: '01392 459210',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Glasgow',
        address: 'Unit 11, Glasgow Fort Shopping Park, Glasgow G33 5AL',
        location: { lat: 55.8720, lng: -4.1423 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Scotland’s largest Some Store location',
        thumbnail: 'Media/StoreFinderImage_Glasgow.jpg',
        phone: '01413 055990',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Aberdeen',
        address: 'Unit 2, Bridge of Don Retail Park, Aberdeen AB23 8JW',
        location: { lat: 57.1800, lng: -2.1050 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Showroom with north coast inspired designs',
        thumbnail: 'Media/StoreFinderImage_Aberdeen.jpg',
        phone: '01224 889100',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Birmingham',
        address: 'Unit 4, Selly Oak Retail Park, Birmingham B29 6SJ',
        location: { lat: 52.4380, lng: -1.9351 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Flagship Midlands store with lounge display zone',
        thumbnail: 'Media/StoreFinderImage_Birmingham.jpg',
        phone: '01214 456980',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Oxford',
        address: 'Unit 10, Botley Road Retail Park, Oxford OX2 0HA',
        location: { lat: 51.7548, lng: -1.2804 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Contemporary display rooms with expert staff',
        thumbnail: 'Media/StoreFinderImage_Oxford.jpg',
        phone: '01865 245900',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Derby',
        address: 'Unit 3, Kingsway Retail Park, Derby DE22 3FA',
        location: { lat: 52.9157, lng: -1.5150 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Midlands oak furniture specialists',
        thumbnail: 'Media/StoreFinderImage_Derby.jpg',
        phone: '01332 440910',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Preston',
        address: 'Unit 10, Deepdale Shopping Park, Preston PR1 6QY',
        location: { lat: 53.7750, lng: -2.6844 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Lancashire branch with large clearance area',
        thumbnail: 'Media/StoreFinderImage_Preston.jpg',
        phone: '01772 884910',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Maidstone',
        address: 'Unit 3, London Road Retail Park, Maidstone ME16 0DT',
        location: { lat: 51.2814, lng: 0.5055 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Kent showroom featuring new modern oak range',
        thumbnail: 'Media/StoreFinderImage_Maidstone.jpg',
        phone: '01622 769510',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Leicester',
        address: 'Unit 4, St. George’s Retail Park, Leicester LE1 7AA',
        location: { lat: 52.6405, lng: -1.1169 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Central England store with large sofa collection',
        thumbnail: 'Media/StoreFinderImage_Leicester.jpg',
        phone: '01162 432870',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
  
   
    
    {
        name: 'Plymouth',
        address: 'Unit 11, Marsh Mills Retail Park, Plymouth PL6 8LX',
        location: { lat: 50.3886, lng: -4.0947 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Coastal store with seaside interior themes',
        thumbnail: 'Media/StoreFinderImage_Plymouth.jpg',
        phone: '01752 450220',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
  
    {
        name: 'Swansea',
        address: 'Unit 7, Morfa Retail Park, Swansea SA1 7BP',
        location: { lat: 51.6333, lng: -3.9295 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Coastal Wales location with oak bedroom suites',
        thumbnail: 'Media/StoreFinderImage_Swansea.jpg',
        phone: '01792 980660',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Hull',
        address: 'Unit 8, St. Andrews Retail Park, Hull HU3 4EB',
        location: { lat: 53.7374, lng: -0.3552 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Popular Yorkshire branch with family design section',
        thumbnail: 'Media/StoreFinderImage_Hull.jpg',
        phone: '01482 331970',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Reading',
        address: 'Unit 6, Reading Gate Retail Park, Reading RG2 0QG',
        location: { lat: 51.4303, lng: -0.9781 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'South East hub with bedroom and dining displays',
        thumbnail: 'Media/StoreFinderImage_Reading.jpg',
        phone: '01189 540210',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Milton Keynes',
        address: 'Unit 2, Rooksley Retail Park, Milton Keynes MK13 8PU',
        location: { lat: 52.0470, lng: -0.7594 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Flagship store in Buckinghamshire with open-plan displays',
        thumbnail: 'Media/StoreFinderImage_MiltonKeynes.jpg',
        phone: '01908 222710',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    
   
    {
        name: 'Liverpool',
        address: 'Unit 6, New Mersey Retail Park, Liverpool L24 8QB',
        location: { lat: 53.3513, lng: -2.8790 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Popular northern branch with interior experts onsite',
        thumbnail: 'Media/StoreFinderImage_Liverpool.jpg',
        phone: '01514 221140',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'York',
        address: 'Unit 5, Clifton Moor Retail Park, York YO30 4XZ',
        location: { lat: 53.9947, lng: -1.0930 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Rustic oak meets modern design at this Yorkshire store',
        thumbnail: 'Media/StoreFinderImage_York.jpg',
        phone: '01904 781670',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Chelmsford',
        address: 'Unit 2, Chelmer Village Retail Park, Chelmsford CM2 6XE',
        location: { lat: 51.7362, lng: 0.5029 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Essex store with smart home inspiration area',
        thumbnail: 'Media/StoreFinderImage_Chelmsford.jpg',
        phone: '01245 450890',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    
    {
        name: 'Coventry',
        address: 'Unit 3, Central Six Retail Park, Coventry CV1 2HA',
        location: { lat: 52.4021, lng: -1.5158 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'High-traffic Midlands showroom with quick pickup area',
        thumbnail: 'Media/StoreFinderImage_Coventry.jpg',
        phone: '02476 980310',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Newcastle',
        address: 'Unit 9, Metro Retail Park, Newcastle NE11 9XR',
        location: { lat: 54.9609, lng: -1.6646 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'North East store featuring modern design ranges',
        thumbnail: 'Media/StoreFinderImage_Newcastle.jpg',
        phone: '01914 483710',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
       {
        name: 'Luton',
        address: 'Unit 5, Gipsy Lane Retail Park, Luton LU1 3JH',
        location: { lat: 51.8721, lng: -0.4176 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Compact Bedfordshire store with local delivery hub',
        thumbnail: 'Media/StoreFinderImage_Luton.jpg',
        phone: '01582 980210',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Bath',
        address: 'Unit 2, Weston Lock Retail Park, Bath BA2 3EX',
        location: { lat: 51.3775, lng: -2.3863 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Elegant store reflecting Bath’s Georgian heritage',
        thumbnail: 'Media/StoreFinderImage_Bath.jpg',
        phone: '01225 993410',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Lincoln',
        address: 'Unit 4, Tritton Retail Park, Lincoln LN6 7AN',
        location: { lat: 53.2192, lng: -0.5513 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Stylish space featuring new oak home office range',
        thumbnail: 'Media/StoreFinderImage_Lincoln.jpg',
        phone: '01522 980540',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Brighton',
        address: 'Unit 3, Brighton Marina Retail Park, Brighton BN2 5UT',
        location: { lat: 50.8124, lng: -0.0998 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Seaside showroom with relaxed coastal interiors',
        thumbnail: 'Media/StoreFinderImage_Brighton.jpg',
        phone: '01273 442100',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Wigan',
        address: 'Unit 6, Robin Park Retail Park, Wigan WN5 0UH',
        location: { lat: 53.5431, lng: -2.6471 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'North West store with open-plan dining sets',
        thumbnail: 'Media/StoreFinderImage_Wigan.jpg',
        phone: '01942 440870',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
    {
        name: 'Dundee',
        address: 'Unit 7, Kingsway West Retail Park, Dundee DD3 8RX',
        location: { lat: 56.4735, lng: -3.0166 },
        summary: 'Some Store',
        tags: ['Showroom'],
        description: 'Scotland’s coastal showroom with oak bedroom suites',
        thumbnail: 'Media/StoreFinderImage_Dundee.jpg',
        phone: '01382 900310',
        hours: {
            Monday: ['09:00', '20:00'],
            Tuesday: ['09:00', '20:00'],
            Wednesday: ['09:00', '20:00'],
            Thursday: ['09:00', '20:00'],
            Friday: ['09:00', '20:00'],
            Saturday: ['09:00', '18:00'],
            Sunday: ['09:00', '17:00']
        }
    },
];
