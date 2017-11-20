from flask import Flask, render_template, jsonify, request
from app.player import Player


app = Flask(__name__)

mplayer = Player()


@app.route('/', methods=['GET'])
def index():

    stations = mplayer.get_station_list()
    active_station = mplayer.get_active_station()

    return render_template('index.html', stations=stations, active_station=active_station)


@app.route('/list/')
def station_list():
    stations = mplayer.get_station_list()
    chuj = []
    for station in stations:
        chuj.append({
            'name': station['name'],
            'url': station['stream']
        })
        
    return jsonify(stations=chuj)
    

@app.route('/radio/play/', methods=['POST'])
def radio_play():

    name = request.form.get('name')
    try:
        mplayer.play(name)
        return jsonify({})
    except:
        return jsonify(error="Could not play selected radio.")


@app.route('/radio/active/', methods=['GET'])
def radio_active():
    return jsonify(active=mplayer.get_active_station())


@app.route('/radio/stop/', methods=['POST'])
def radio_stop():
    
    mplayer.stop()

    return jsonify({})
