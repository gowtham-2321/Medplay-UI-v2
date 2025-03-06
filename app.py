from flask import Flask, render_template, request, jsonify, Response, stream_with_context
import requests
from io import BytesIO
import urllib3

# Suppress only the single InsecureRequestWarning from urllib3 needed for development
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)

@app.after_request
def add_security_headers(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response

API_URL = "https://api-medplay.vercel.app"

@app.route('/')
def home():
    songs = []
    
    return render_template('index.html', songs=[])

@app.route('/search/songs', methods=['GET'])
def search():
    query = request.args.get('query', '')
    limit = request.args.get('limit', '')
    page = request.args.get('page', '')


    #print(query,limit,page)
    if not query:
        return render_template('index.html', songs=None)
    
    try:
        response = requests.get(f"{API_URL}/api/search/songs?query={query}&limit={limit}&page={page}", verify=False)
        # print(response.status_code, response.text)
        songs = response.json().get('data', [])
        songs = songs["results"]

    except Exception as e:
        print("Error fetching search results:", e)
        songs = []
    
    return songs

@app.route('/albums', methods=['GET'])
def getAlbum():
    albumid = request.args.get('id', '')

    #print(albumid)
    if not albumid:
        return render_template('index.html', songs=None)
    
    try:
        response = requests.get(f"{API_URL}/api/albums?id={albumid}", verify=False)
        # print(response.status_code, response.text)
        songs = response.json().get('data', [])

    except Exception as e:
        print("Error fetching search results:", e)
        songs = []
    
    data = songs
    return jsonify(data)
    

@app.route('/search/song', methods=['GET'])
def searchsong():
    id = request.args.get('id', '')

    if not id:
        return None
    
    try:
        response = requests.get(f"{API_URL}/api/songs/{id}", verify=False)
        #print(response.status_code, response.text)
        song = response.json().get('data', [])

    except Exception as e:
        print("Error fetching search results:", e)
        song = []
    
    return song

@app.route('/search/albums', methods=['GET'])
def searchAlbum():
    alQ = request.args.get('q', '')
    limit = request.args.get('limit', '')
    page = request.args.get('page', '')
    
    try:
        response = requests.get(f"{API_URL}/api/search/albums?query={alQ}&limit={limit}&page={page}")
        albums= response.json().get('data',[])
        albums = albums["results"]
    except Exception as e:
        print("Error Fetching albums search", e)
        albums=[]
    
    return albums

@app.route('/stream/')
def stream():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400

    headers = {
        'Range': request.headers.get('Range', '')
    }

    upstream_response = requests.get(url, headers=headers, stream=True)

    def generate():
        for chunk in upstream_response.iter_content(chunk_size=8192):
            if chunk:
                yield chunk

    response = Response(stream_with_context(generate()), status=upstream_response.status_code, content_type=upstream_response.headers.get('Content-Type'))
    response.headers['Content-Range'] = upstream_response.headers.get('Content-Range')
    response.headers['Accept-Ranges'] = 'bytes'
    response.headers['Content-Length'] = upstream_response.headers.get('Content-Length')
    return response

@app.route('/image/')
def image():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400

    upstream_response = requests.get(url, stream=True)

    def generate():
        for chunk in upstream_response.iter_content(chunk_size=8192):
            if chunk:
                yield chunk

    response = Response(stream_with_context(generate()), status=upstream_response.status_code, content_type=upstream_response.headers.get('Content-Type'))
    response.headers['Content-Length'] = upstream_response.headers.get('Content-Length')
    return response

@app.route('/download/')
def download():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400
    
    filename = request.args.get('filename', 'downloaded_song.mp3')
    response = requests.get(url, stream=True)
    
    return Response(
        response.iter_content(chunk_size=1024),
        headers={
            'Content-Disposition': f'attachment; filename={filename}.mp3',
            'Content-Type': 'audio/mpeg'
        }
    )

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
