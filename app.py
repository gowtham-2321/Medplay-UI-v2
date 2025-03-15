from flask import Flask, render_template, request, jsonify, Response, stream_with_context, send_file
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
    
    return render_template("index.html", show_404=False)

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

@app.route('/streamer/')
def streamer():
    url = request.args.get('url', '')
    if not url:
        return "No URL provided", 400

    headers = {
        'Range': request.headers.get('Range', '')
    }

    upstream_response = requests.get(url, headers=headers, stream=True)

    def generate():
        for chunk in upstream_response.iter_content(chunk_size=1024):
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
    
    
    upstream_response = requests.get(url, stream=True, verify=False)
    if upstream_response.status_code != 200:
        return send_file('static/img/song art.jpg')

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

@app.errorhandler(404)
def page_not_found(e):
    return render_template("index.html", show_404=True), 404

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
