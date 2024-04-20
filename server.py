from ast import keyword
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

data = [
    {
        "id": "1",
        "volumeInfo": {
            "title": "The Intelligent Investor",
            "authors": ["Benjamin Graham"],
            "publisher": "HarperCollins",
            "publishedDate": "2006-02-21",
            "description": "The greatest investment advisor of the twentieth century, Benjamin Graham taught and inspired people worldwide. Graham's philosophy of 'value investing' -- protecting oneself from substantial error and teaching oneself to 'invest in the long-term' has made The Intelligent Investor the stock market bible ever since its original publication in 1949.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0060555661"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780060555665"
                }
            ],
            "pageCount": 640,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/91+t0Di07FL.jpg"
            }
        }
    },
    {
        "id": "2",
        "volumeInfo": {
            "title": "Common Stocks and Uncommon Profits",
            "authors": ["Philip A. Fisher"],
            "publisher": "John Wiley & Sons",
            "publishedDate": "1996-08-29",
            "description": "Widely respected and admired, Philip Fisher is among the most influential investors of all time. His investment philosophies, introduced almost forty years ago, are not only studied and applied by today's finance professionals but are also regarded by many as gospel. This book is invaluable reading and has been since it was first published in 1958.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "047111927X"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780471119273"
                }
            ],
            "pageCount": 320,
            "categories": ["Business & Economics / Investments & Securities / Stocks"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/61tzuAYGKqL._SL1500_.jpg"
            }
        }
    },
    {
        "id": "3",
        "volumeInfo": {
            "title": "One Up On Wall Street",
            "authors": ["Peter Lynch"],
            "publisher": "Simon & Schuster",
            "publishedDate": "2000-04-03",
            "description": "More than one million copies have been sold of this seminal book on investing in which legendary mutual-fund manager Peter Lynch explains the advantages that average investors have over professionals and how they can use these advantages to achieve financial success.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0743200403"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780743200400"
                }
            ],
            "pageCount": 304,
            "categories": ["Business & Economics / Personal Finance / Investing"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/81O-dMP4VcL._SL1500_.jpg"
            }
        }
    },
    {
        "id": "4",
        "volumeInfo": {
            "title": "The Little Book That Still Beats the Market",
            "authors": ["Joel Greenblatt"],
            "publisher": "John Wiley & Sons",
            "publishedDate": "2010-09-07",
            "description": "In a straightforward and accessible style, The Little Book That Beats the Market author Joel Greenblatt explains how investors can outperform the popular market averages by simply and systematically applying a formula that seeks out good businesses when they are available at bargain prices.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0470624159"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780470624159"
                }
            ],
            "pageCount": 208,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/81nnMgmqbKS._SL1500_.jpg"
            }
        }
    },
    {
        "id": "5",
        "volumeInfo": {
            "title": "A Random Walk Down Wall Street",
            "authors": ["Burton G. Malkiel"],
            "publisher": "W. W. Norton & Company",
            "publishedDate": "2019-01-01",
            "description": "In this new edition of the best-selling A Random Walk Down Wall Street, Burton G. Malkiel shares authoritative insights spanning the full range of investment opportunities—including valuable new material on cryptocurrencies, automated investment advisers, and 'green finance.' Malkiel's reassuring and vastly informative volume remains the best investment guide money can buy.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0393358380"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780393358384"
                }
            ],
            "pageCount": 432,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/71NHYL5qDxL._SL1200_.jpg"
            }
        }
    },
    {
        "id": "6",
        "volumeInfo": {
            "title": "The Essays of Warren Buffett: Lessons for Corporate America",
            "authors": ["Warren E. Buffett", "Lawrence A. Cunningham"],
            "publisher": "The Cunningham Group",
            "publishedDate": "2013-03-15",
            "description": "The fourth edition of The Essays of Warren Buffett: Lessons for Corporate America celebrates its twentieth anniversary. As the book Buffett autographs most, its popularity and longevity attest to the widespread appetite for this unique compilation of Buffett's thoughts that is at once comprehensive, non-repetitive, and digestible. New and experienced readers alike will gain an invaluable informal education by perusing this classic arrangement of Warren's best writings.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1611637589"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781611637588"
                }
            ],
            "pageCount": 328,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/81WIV+RymeL._SL1500_.jpg"
            }
        }
    },
    {
        "id": "7",
        "volumeInfo": {
            "title": "The Dhandho Investor: The Low-Risk Value Method to High Returns",
            "authors": ["Mohnish Pabrai"],
            "publisher": "John Wiley & Sons",
            "publishedDate": "2007-06-29",
            "description": "A comprehensive value investing framework for the individual investor. In a straightforward and accessible manner, The Dhandho Investor lays out the powerful framework of value investing. Written with the intelligent individual investor in mind, this comprehensive guide distills the Dhandho capital allocation framework of the business savvy Patels from India and presents how they can be applied successfully to the stock market.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "047004389X"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780470043899"
                }
            ],
            "pageCount": 208,
            "categories": ["Business & Economics / Investments & Securities / Value Investing"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/51DNj496X+L.jpg"
            }
        }
    },
    {
        "id": "8",
        "volumeInfo": {
            "title": "Security Analysis: Sixth Edition",
            "authors": ["Benjamin Graham", "David Dodd"],
            "publisher": "McGraw-Hill Education",
            "publishedDate": "2008-09-25",
            "description": "Buying a bargain-priced security for less than what it's worth, the cornerstone of Graham and Dodd's revolutionary, battle-tested strategy for building wealth in the stock market. \"Security Analysis\" is one of the most influential financial books ever written. Selling more than one million copies through five editions, it has provided generations of investors with the timeless value investing philosophy and techniques of Benjamin Graham and David L. Dodd.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "0071592539"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9780071592536"
                }
            ],
            "pageCount": 700,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/61qvQIlGEXL._SL1000_.jpg"
            }
        }
    },
    {
        "id": "9",
        "volumeInfo": {
            "title": "The Warren Buffett Way",
            "authors": ["Robert G. Hagstrom"],
            "publisher": "Wiley",
            "publishedDate": "2013-09-30",
            "description": "Warren Buffett is the most famous investor of all time and one of today’s most admired business leaders. He became a billionaire and investment sage by looking at companies as businesses rather than prices on a stock screen. This book distills the strategies, investments, and management techniques that propelled Buffett’s success so that anyone can learn to apply them.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1118503252"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781118503256"
                }
            ],
            "pageCount": 320,
            "categories": ["Business & Economics / Investments & Securities / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/41qcNkIASoL._SY445_SX342_.jpg"
            }
        }
    },
    {
        "id": "10",
        "volumeInfo": {
            "title": "Principles: Life and Work",
            "authors": ["Ray Dalio"],
            "publisher": "Simon & Schuster",
            "publishedDate": "2017-09-19",
            "description": "Ray Dalio, one of the world’s most successful investors and entrepreneurs, shares the unconventional principles that he’s developed, refined, and used over the past forty years to create unique results in both life and business—and which any person or organization can adopt to help achieve their goals.",
            "industryIdentifiers": [
                {
                    "type": "ISBN_10",
                    "identifier": "1501124021"
                },
                {
                    "type": "ISBN_13",
                    "identifier": "9781501124020"
                }
            ],
            "pageCount": 592,
            "categories": ["Business & Economics / Personal Finance / General"],
            "imageLinks": {
                "thumbnail": "https://m.media-amazon.com/images/I/41Dn20bdaAL._SY445_SX342_.jpg"
            }
        }
    }
]


# todo: to optimize
# 1. use date tag in add.html
#
#
id = 11

# ROUTES

@app.route('/')
def default():
   return render_template('home.html')   

@app.route('/home')
def home():
   return render_template('home.html')  


@app.route('/add')
def add():
   return render_template('add.html')  


@app.route('/view/<id>', methods=['GET', 'POST'])
def get_details(id = None):

    global data

    print(id)
    print(type(id))

    item = None
    
    if request.method == 'GET':
        print("Get view")

        # index = None
        # for i in range(len(data)):
        #     if data[i]["id"] == id:
        #         index = i
        item = data[int(id) - 1]

    if request.method == 'POST':
        print("post view")

        print(request.form.getlist('author'))
        print(type(request.form))

        item = data[int(id) - 1]
        item["volumeInfo"]["title"] = request.form['title']
        item["volumeInfo"]["authors"] = request.form.getlist("author")
        item["volumeInfo"]["publisher"] = request.form['publisher']
        item["volumeInfo"]["publishedDate"] = request.form['published-date']
        item["volumeInfo"]["description"] = request.form['description']
        item["volumeInfo"]["industryIdentifiers"] = [
            {
                "type": "ISBN_10",
                "identifier": request.form.getlist('isbn')[0]
            },
            {
                "type": "ISBN_13",
                "identifier": request.form.getlist('isbn')[1]
            }
        ]
        item["volumeInfo"]["pageCount"] = request.form['length']
        item["volumeInfo"]["imageLinks"]["thumbnail"] = request.form['image-link']
        
    return render_template('view.html', item = item)


# @app.route('/search_results/<keyword>', methods=['GET', 'POST'])
# def search_results(keyword = None):

#     global data

#     print("search_results")

#     # json_data = request.get_json()   
#     # kw = json_data["keyword"] 
#     print(keyword)
#     print(type(keyword))

#     search_list = {}
    
#     # search in title
#     for i in range(len(data)):
#         if keyword.lower() in data[i]["volumeInfo"]["title"].lower():
#             # print(data[i]["volumeInfo"]["title"])
#             search_list[data[i]["id"]]  = data[i]
    
#     # search in publisher
#     for i in range(len(data)):
#         if keyword.lower() in data[i]["volumeInfo"]["publisher"].lower():
#             # print(data[i]["volumeInfo"]["title"])
#             search_list[data[i]["id"]]  = data[i]

#     # search in authors
#     for i in range(len(data)):
#         for author in data[i]["volumeInfo"]["authors"]:
#             if keyword.lower() in author.lower():
#                 # print(data[i]["volumeInfo"]["title"])
#                 search_list[data[i]["id"]]  = data[i]


#     print(search_list)
#     return render_template('search.html', search_list = search_list, keyword = keyword)

@app.route('/search_results/<keyword>')
def search_results(keyword):
    search_list = [item for item in data if keyword.lower() in item['volumeInfo']['title'].lower()]
    return render_template('search.html', search_list=search_list, keyword=keyword)


# @app.route('/search', methods=['GET'])
# def search():
#     search_query = request.args.get('search', '').lower()  # Default to empty string and convert to lowercase
#     search_results = [element for element in results if search_query in element["name"].lower()]  # Case insensitive search
#     return render_template('search_results.html', search_query=search_query, results=search_results)

@app.route('/get_item', methods=['GET', 'POST'])
def get_item():

    global data 

    json_data = request.get_json()   
    id = json_data["id"] 
    print(id)
    print(type(id))

    item = data[int(id) - 1]

    return jsonify(item = item)


@app.route('/add_item', methods=['GET', 'POST'])
def add_item():

    global data 
    global id

    json_data = request.get_json()   
    new_book = json_data["new_book"] 
    print(new_book)
    print(type(new_book))

    new_book["id"] = str(id)
    id = id + 1
    data.append(new_book)

    return jsonify(id = id - 1)


@app.route('/edit/<id>', methods=['GET', 'POST'])
def to_edit(id = None):

    global data 

    print("edit id")
    # json_data = request.get_json()   
    # id = json_data["id"] 
    # print(id)
    # print(type(id))

    print(id)
    item = data[int(id) - 1]

    return render_template('edit.html', item = item)


@app.route('/edit-submit/<id>', methods=['GET', 'POST'])
def to_view(id = None):

    global data 

    print("edit submit")

    print(request.form.getlist('author'))
    print(type(request.form))

    item = data[int(id) - 1]
    item["volumeInfo"]["title"] = request.form['title']
    item["volumeInfo"]["author"] = request.form.getlist("author")
    item["volumeInfo"]["publisher"] = request.form['publisher']
    item["volumeInfo"]["publishedDate"] = request.form['published-date']
    item["volumeInfo"]["description"] = request.form['description']
    item["volumeInfo"]["industryIdentifiers"] = [
        {
            "type": "ISBN_10",
            "identifier": request.form.getlist('isbn')[0]
        },
        {
            "type": "ISBN_13",
            "identifier": request.form.getlist('isbn')[1]
        }
    ]
    item["volumeInfo"]["pageCount"] = request.form['length']
    item["volumeInfo"]["imageLinks"]["thumbnail"] = request.form['image-link']
    
    print(id)


    return render_template('view.html', item = item)

if __name__ == '__main__':
   app.run(debug = True)
