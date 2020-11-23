'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('courses', [
        {
            "name": "Shawshank Disc Golf Course",
            "place_id": "ChIJsWKlaBsNR4YR6-Oxu2pqLsk",
            "address": "450 Four Notch Rd, Huntsville, TX 77340",
            "rating": 4.8,
            "lat": 30.6382522,
            "long": -95.4233627
        },
        {
            "name": "Eastham-Thomason Disc Golf Course",
            "place_id": "ChIJRQLlAoQIR4YRd1AFozhm1bM",
            "address": "924 Ave O, Huntsville, TX 77320",
            "rating": 4.3,
            "lat": 30.725376,
            "long": -95.555936
        },
        {
            "name": "Lemontree Park",
            "place_id": "ChIJXami5n2ERoYR5lgGWufi634",
            "address": "1300 Lemon Tree Ln, College Station, TX 77840",
            "rating": 4.2,
            "lat": 30.60593249999999,
            "long": -96.3169583
        },
        {
            "name": "Oaks Park",
            "place_id": "ChIJG3pwkHGERoYRgKjJfI0DzMA",
            "address": "1601 Stallings Dr, College Station, TX 77840",
            "rating": 4.4,
            "lat": 30.6213592,
            "long": -96.3138824
        },
        {
            "name": "Research Park Disc Golf Course",
            "place_id": "ChIJYb69Yt-DRoYR5rkqKYsgclY",
            "address": "2 Research Park, 1700 Research Pkwy, College Station, TX 77845",
            "rating": 0,
            "lat": 30.60034349999999,
            "long": -96.3594506
        },
        {
            "name": "B. Schmitz Park Disc Golf Course",
            "place_id": "ChIJSzvrZ_3SQIYR3-1sqvTStIQ",
            "address": "15800 Birchview Dr, Tomball, TX 77377",
            "rating": 3.3,
            "lat": 30.0037891,
            "long": -95.6031682
        },
        {
            "name": "Southern Oaks Park",
            "place_id": "ChIJBzpwIiuFRoYRBdhAaud9nPI",
            "address": "1398 Southern Plantation Dr, College Station, TX 77845",
            "rating": 4.4,
            "lat": 30.5625509,
            "long": -96.27657289999999
        },
        {
            "name": "Hilltop Lakes Disc Golf Course",
            "place_id": "ChIJBdc5zRptRoYRS6pb9cQH0zM",
            "address": "5-65 Lakefront Dr, Normangee, TX 77871",
            "rating": 0,
            "lat": 31.0815488,
            "long": -96.19736619999999
        },
        {
            "name": "Zube Park Disc Golf Course",
            "place_id": "ChIJkebblaosQYYRoxd230HSdx4",
            "address": "17560 Roberts Rd, Hockley, TX 77447",
            "rating": 4.8,
            "lat": 30.0272001,
            "long": -95.81024819999999
        },
        {
            "name": "Bear Branch Disc Golf Course (18)",
            "place_id": "ChIJ2Q4XQBUxR4YRRXthKzf28qg",
            "address": "The Woodlands, TX 77381",
            "rating": 4.6,
            "lat": 30.1926258,
            "long": -95.4947254
        },
        {
            "name": "Research Park",
            "place_id": "ChIJ7dnIA6qDRoYReQfU3mEixO4",
            "address": "1139-1355 Technology Loop, College Station, TX 77845",
            "rating": 4.6,
            "lat": 30.6031898,
            "long": -96.36003529999999
        },
        {
            "name": "Spring Valley Golf and Disc Golf",
            "place_id": "ChIJdS9_D9szR4YRQcxtzPRaYqg",
            "address": "25110 Gosling Rd, Spring, TX 77389",
            "rating": 4.3,
            "lat": 30.128988,
            "long": -95.504944
        },
        {
            "name": "Camelot Park",
            "place_id": "ChIJXRZYtmmBRoYRshyCKFVY_Dg",
            "address": "Bryan, TX 77802",
            "rating": 4.1,
            "lat": 30.6646571,
            "long": -96.3462055
        },
        {
            "name": "Nottingham Park Disc Golf Course",
            "place_id": "ChIJQ1P4SnfbQIYRP4SB4LzjUGE",
            "address": "926 Country Pl Dr, Houston, TX 77079",
            "rating": 4.6,
            "lat": 29.776154,
            "long": -95.59864669999999
        },
        {
            "name": "Texas Army Trail Disc Golf Course",
            "place_id": "ChIJ2dRerffVQIYRXSEOe-Nbi3c",
            "address": "Bud Hadfield Park, 12405 Telge Rd, Cypress, TX 77429",
            "rating": 5,
            "lat": 29.9515677,
            "long": -95.6500082
        },
        {
            "name": "T.C. Jester Disc Golf Course",
            "place_id": "ChIJSelcyELGQIYRf47QAKiZAAU",
            "address": "4201 T C Jester Blvd, Houston, TX 77018",
            "rating": 4.6,
            "lat": 29.8276129,
            "long": -95.4553739
        },
        {
            "name": "Agnes Moffitt Disc Golf Course",
            "place_id": "ChIJfxbVdvPFQIYRulRIiDh-gIY",
            "address": "10625 Hammerly Blvd, Houston, TX 77043",
            "rating": 4.6,
            "lat": 29.8118214,
            "long": -95.5609125
        },
        {
            "name": "Little Egypt DGC",
            "place_id": "ChIJKSg4HnM9R4YRTIIOSarBTfw",
            "address": "Willis, TX 77318",
            "rating": 0,
            "lat": 30.3837398,
            "long": -95.5217569
        },
        {
            "name": "Gwen Hruska Disc Golf Course",
            "place_id": "ChIJl6Tb8M45R4YRZrXMuqZpsuE",
            "address": "125 Butlers Island, Conroe, TX 77302",
            "rating": 4,
            "lat": 30.245592,
            "long": -95.442922
        },
        {
            "name": "Texas A&M University Research Park",
            "place_id": "ChIJTd96BKqDRoYRZfZNsbBRZ3E",
            "address": "Research Pkwy, College Station, TX 77845",
            "rating": 4.5,
            "lat": 30.6023649,
            "long": -96.35905430000001
        },
        {
            "name": "Inwood Forest Disc Golf Course",
            "place_id": "ChIJZ8rbALPIQIYRTO-bSXmoYMw",
            "address": "7603 Antoine Dr, Houston, TX 77088",
            "rating": 4.3,
            "lat": 29.8755101,
            "long": -95.4752982
        },
        {
            "name": "Worthham Trail Disc Golf Course",
            "place_id": "ChIJn0DUE3HRQIYRqLi5oR7wP3c",
            "address": "10702 Wolsley Ct, Houston, TX 77065",
            "rating": 4,
            "lat": 29.9254783,
            "long": -95.61515329999999
        },
        {
            "name": "Wells Branch Disc Golf Course",
            "place_id": "ChIJd_pmUPLORIYRbF5Ppq3hpkk",
            "address": "Owen-Tech Blvd, Austin, TX 78728",
            "rating": 4.6,
            "lat": 30.4338594,
            "long": -97.6719368
        },
        {
            "name": "Pinnacle Disc Golf Course",
            "place_id": "ChIJFdyEzh3XRIYRq8kcfn1lS08",
            "address": "Georgetown, TX 78626",
            "rating": 1.3,
            "lat": 30.6077892,
            "long": -97.65265269999999
        },
        {
            "name": "Old Settler's Park Disc Golf",
            "place_id": "ChIJWYOI0I7QRIYRfCtqX7BVNiU",
            "address": "3103 Aten Loop, Round Rock, TX 78665",
            "rating": 4.4,
            "lat": 30.5410321,
            "long": -97.6258112
        },
        {
            "name": "Wolf Pen Creek Park",
            "place_id": "ChIJq_OeSmiERoYR6OH79KZ2lEs",
            "address": "1015 Colgate Dr, College Station, TX 77840",
            "rating": 4.6,
            "lat": 30.6181868,
            "long": -96.30414379999999
        },
        {
            "name": "Purser Park Disc Golf Course",
            "place_id": "ChIJWYMUYNpJRYYR827fDJXWVAw",
            "address": "Harker Heights, TX 76548",
            "rating": 4.6,
            "lat": 31.0599246,
            "long": -97.6769355
        },
        {
            "name": "Williamson County Disc Golf Course",
            "place_id": "ChIJhwjg0FzTRIYRt9zr-f6nOUE",
            "address": "221-255 Perry Mayfield Blvd, Leander, TX 78641",
            "rating": 4.7,
            "lat": 30.561312,
            "long": -97.766544
        },
        {
            "name": "Burger Estates Disc Golf Course",
            "place_id": "ChIJP7JmLrPPQIYRjpgLyOJ7mI4",
            "address": "7431 Gailey Ln, Houston, TX 77040",
            "rating": 0,
            "lat": 29.8829008,
            "long": -95.53590369999999
        },
        {
            "name": "Heritage Park Disc Golf Course",
            "place_id": "ChIJj7p4QExBRYYR4LwkzAhxT2Q",
            "address": "601-799 E 24th Ave, Belton, TX 76513",
            "rating": 4.9,
            "lat": 31.0790729,
            "long": -97.4485473
        },
        {
            "name": "William Cameron Park Professional Disc Golf Corse",
            "place_id": "ChIJgwYDIRuDT4YRkM_OWMd7Q-8",
            "address": "Waco, TX 76704",
            "rating": 5,
            "lat": 31.5781921,
            "long": -97.143834
        },
        {
            "name": "North Town Disc Golf",
            "place_id": "ChIJYdlXXR_PRIYRu0a8LDVFg4M",
            "address": "Pflugerville, TX 78660",
            "rating": 4.5,
            "lat": 30.4192368,
            "long": -97.6438187
        },
        {
            "name": "Bob Cherry Park",
            "place_id": "ChIJPx13PP6DRoYRBQ43Ra9j4WE",
            "address": "3607 Windridge Dr, Bryan, TX 77802",
            "rating": 4.3,
            "lat": 30.6493333,
            "long": -96.3264289
        },
        {
            "name": "Victory Disc Golf Course",
            "place_id": "ChIJ_wcQGr_JQIYRW8GF3hUDsIs",
            "address": "4311 Black Maple Ln, Houston, TX 77088",
            "rating": 5,
            "lat": 29.8638134,
            "long": -95.46819939999999
        },
        {
            "name": "Bartholomew Disc Golf Park",
            "place_id": "ChIJ8_yh8P3JRIYR7xDbwgIFlNY",
            "address": "1990-2088 E 51st St, Austin, TX 78723",
            "rating": 3.8,
            "lat": 30.3022484,
            "long": -97.692101
        },
        {
            "name": "Brazos Park Disc Golf Course",
            "place_id": "ChIJHX7VOQEcQYYRXotOl2_P7YE",
            "address": "320 Houston St, Rosenberg, TX 77471",
            "rating": 4.3,
            "lat": 29.5644469,
            "long": -95.8103222
        },
        {
            "name": "Cat Hollow Disc Golf",
            "place_id": "ChIJxZs6pELSRIYRd39hVrldF7g",
            "address": "8334 Liberty Walk Dr, Round Rock, TX 78681",
            "rating": 4.6,
            "lat": 30.5061529,
            "long": -97.7299142
        },
        {
            "name": "Conder Park Disc Golf Course",
            "place_id": "ChIJe3WpeoRLRYYRs68Lo6nssWU",
            "address": "241346, Killeen, TX 76541",
            "rating": 0,
            "lat": 31.108664,
            "long": -97.7191429
        },
        {
            "name": "Imperial Park Disc Golf Course",
            "place_id": "ChIJaS0gB-HnQIYRYeIn-m_DpRQ",
            "address": "7750 US-90 ALT, Sugar Land, TX 77478",
            "rating": 4.5,
            "lat": 29.6156013,
            "long": -95.6395342
        },
        {
            "name": "Benbrook Disc Golf Course",
            "place_id": "ChIJQ1kJ4F0pW4YR3xR5Ci7OBws",
            "address": "1100 Halsey Dr, Leander, TX 78641",
            "rating": 4.1,
            "lat": 30.5868714,
            "long": -97.8777528
        },
        {
            "name": "Kiwanis Club Disc Golf Club",
            "place_id": "ChIJn6WeOu1LRYYR2jEiJyh8Eaw",
            "address": "1708 E Veterans Memorial Blvd, Killeen, TX 76541",
            "rating": 3.7,
            "lat": 31.1094764,
            "long": -97.71924829999999
        },
        {
            "name": "Roy G Guerrero Disc Golf Course",
            "place_id": "ChIJc-bTyTG0RIYRogpbfw1xsYg",
            "address": "517 S Pleasant Valley Rd, Austin, TX 78741",
            "rating": 4.6,
            "lat": 30.24719069999999,
            "long": -97.70851950000001
        },
        {
            "name": "University Park",
            "place_id": "ChIJf8TtZviDRoYROR3FyC4ygqE",
            "address": "Park Rd, College Station, TX 77840",
            "rating": 4.5,
            "lat": 30.64091,
            "long": -96.3229865
        },
        {
            "name": "Block House Creek Disc Golf Course",
            "place_id": "ChIJyeTdi2stW4YRKy199koQFt4",
            "address": "R300241, Leander, TX 78641",
            "rating": 3.8,
            "lat": 30.5434686,
            "long": -97.8344489
        },
        {
            "name": "Crossroads Disc Golf Course",
            "place_id": "ChIJCRutHMdrRYYR6z4343XuPtc",
            "address": "Temple, TX 76502",
            "rating": 4.7,
            "lat": 31.1239551,
            "long": -97.4085221
        },
        {
            "name": "Zilker Park Disc Golf Course",
            "place_id": "ChIJj8ZmCDq1RIYR3abUXxFoPnk",
            "address": "2100 Barton Springs Rd, Austin, TX 78746",
            "rating": 4.7,
            "lat": 30.2668486,
            "long": -97.77585099999999
        },
        {
            "name": "Tiffany Park",
            "place_id": "ChIJvUuomqGGRoYR1DFZ4b4Pd0U",
            "address": "3890 Copperfield Dr, Bryan, TX 77803",
            "rating": 4.6,
            "lat": 30.6564367,
            "long": -96.3031786
        },
        {
            "name": "Timber Lane Park DGC",
            "place_id": "ChIJa_XvC1S1QIYRWmCd095_ygY",
            "address": "2615 Ciderwood Dr, Spring, TX 77373",
            "rating": 4.6,
            "lat": 30.0440452,
            "long": -95.3885942
        },
        {
            "name": "Rice University Disc Golf Course",
            "place_id": "ChIJK3LbslrBQIYRCp_mYLfGC-A",
            "address": "Alumni Dr, Houston, TX 77005",
            "rating": 2.5,
            "lat": 29.7140312,
            "long": -95.4022821
        },
        {
            "name": "Moody's Disc Golf Ranch",
            "place_id": "ChIJAcgsuSlhQ4YRufVr0tkeDs4",
            "address": "121 Meuth Cemetery Rd, Red Rock, TX 78662",
            "rating": 4.3,
            "lat": 29.946481,
            "long": -97.3715615
        },
        {
            "name": "MetCenter Disc Golf Course",
            "place_id": "ChIJ6YN9sjazRIYRDiCHEGnGEbI",
            "address": "Metropolis Dr, Austin, TX 78744",
            "rating": 4.6,
            "lat": 30.2062838,
            "long": -97.69601740000002
        },
        {
            "name": "City of Lockhart Disc Golf Course",
            "place_id": "ChIJ7VJRWvpWQ4YRlUXXsN9Unkw",
            "address": "City Park Rd, Lockhart, TX 78644",
            "rating": 4.6,
            "lat": 29.8873744,
            "long": -97.66803139999999
        },
        {
            "name": "NASA Disc Golf Course",
            "place_id": "ChIJiW2zQrydQIYR4THx-HX7NAU",
            "address": "Houston, TX 77058",
            "rating": 2.9,
            "lat": 29.5680813,
            "long": -95.08454019999999
        },
        {
            "name": "Wildflower Disc Golf Micro-Course",
            "place_id": "ChIJs3-vZAwzW4YRvhiBww-_ZtE",
            "address": "2608 Corabella Pl, Cedar Park, TX 78613",
            "rating": 3,
            "lat": 30.4646373,
            "long": -97.8447241
        },
        {
            "name": "Mary Moore Disc Golf Course",
            "place_id": "ChIJL0wns-BMW4YRmMecj9MvShE",
            "address": "Austin, TX 78748",
            "rating": 4.7,
            "lat": 30.1629954,
            "long": -97.8072021
        },
        {
            "name": "East Metro Park Disc Golf Course",
            "place_id": "ChIJD2JAqCi5RIYRhf1y3wUqeDQ",
            "address": "Manor, TX 78653",
            "rating": 0,
            "lat": 30.2873001,
            "long": -97.5295793
        },
        {
            "name": "Taylor Lake Village Disc Golf Course",
            "place_id": "ChIJAdQRX3RiP4YRIKpO7o71nBQ",
            "address": "500 Kirby Blvd, Taylor Lake Village, TX 77586",
            "rating": 4.4,
            "lat": 29.5740901,
            "long": -95.0561699
        },
        {
            "name": "Evergreen Disc Golf Course",
            "place_id": "ChIJQY1_kfFdP4YRdO0EkNuWnVo",
            "address": "1530 Evergreen Rd, Baytown, TX 77523",
            "rating": 4.7,
            "lat": 29.7059797,
            "long": -94.9618832
        },
        {
            "name": "Disc Golf Baytown TX",
            "place_id": "ChIJQR34XGRcP4YRJ7ikGrRkbws",
            "address": "4334 Crosby Cedar Bayou Rd, Baytown, TX 77521",
            "rating": 4.4,
            "lat": 29.7744505,
            "long": -94.9417874
        },
        {
            "name": "Centennial Park Disc Golf Course",
            "place_id": "ChIJi3LTEHeRQIYRZKvQoyBv_ZY",
            "address": "3210 McLean Rd, Pearland, TX 77584",
            "rating": 4.3,
            "lat": 29.5484892,
            "long": -95.29946919999999
        }

    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('courses', null, {})
  }
};
