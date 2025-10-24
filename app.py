from flask import Flask, render_template, request, jsonify
import os
import json
from datetime import datetime

app = Flask(__name__)

# Room state storage (in production, use a database)
room_state = {
    'lights': {
        'main': False,
        'bedside': False,
        'desk': False
    },
    'last_updated': datetime.now().isoformat()
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET', 'POST'])
def api_data():
    if request.method == 'POST':
        data = request.get_json()
        # Process the data here
        return jsonify({'status': 'success', 'message': 'Data received successfully'})
    
    # Return sample data for GET requests
    return jsonify({
        'message': 'Hello from Flask!',
        'data': ['Item 1', 'Item 2', 'Item 3'],
        'timestamp': '2024-01-01T00:00:00Z'
    })

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    try:
        # Simple calculation example
        num1 = float(data.get('num1', 0))
        num2 = float(data.get('num2', 0))
        operation = data.get('operation', 'add')
        
        if operation == 'add':
            result = num1 + num2
        elif operation == 'subtract':
            result = num1 - num2
        elif operation == 'multiply':
            result = num1 * num2
        elif operation == 'divide':
            result = num1 / num2 if num2 != 0 else 'Error: Division by zero'
        else:
            result = 'Invalid operation'
            
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/room/state', methods=['GET'])
def get_room_state():
    """Get current room state"""
    return jsonify({
        'status': 'success',
        'data': room_state
    })

@app.route('/api/room/toggle', methods=['POST'])
def toggle_room_switch():
    """Toggle a room switch"""
    try:
        data = request.get_json()
        switch_id = data.get('switch_id')
        state = data.get('state')
        
        if switch_id not in room_state['lights']:
            return jsonify({'error': 'Invalid switch ID'}), 400
        
        # Update room state
        room_state['lights'][switch_id] = state
        room_state['last_updated'] = datetime.now().isoformat()
        
        # Calculate power usage
        lights_on = sum(room_state['lights'].values())
        power_usage = lights_on * 60  # 60W per light
        
        return jsonify({
            'status': 'success',
            'message': f'Switch {switch_id} turned {"on" if state else "off"}',
            'data': {
                'switch_id': switch_id,
                'state': state,
                'lights_on': lights_on,
                'power_usage': power_usage,
                'timestamp': room_state['last_updated']
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/room/reset', methods=['POST'])
def reset_room():
    """Reset all room switches to off"""
    try:
        for switch_id in room_state['lights']:
            room_state['lights'][switch_id] = False
        
        room_state['last_updated'] = datetime.now().isoformat()
        
        return jsonify({
            'status': 'success',
            'message': 'All switches turned off',
            'data': room_state
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/room/scene/<scene_name>', methods=['POST'])
def set_room_scene(scene_name):
    """Set a predefined room scene"""
    scenes = {
        'all_on': {'main': True, 'bedside': True, 'desk': True},
        'all_off': {'main': False, 'bedside': False, 'desk': False},
        'reading': {'main': False, 'bedside': True, 'desk': True},
        'sleep': {'main': False, 'bedside': False, 'desk': False},
        'work': {'main': True, 'bedside': False, 'desk': True}
    }
    
    if scene_name not in scenes:
        return jsonify({'error': 'Invalid scene name'}), 400
    
    try:
        room_state['lights'] = scenes[scene_name]
        room_state['last_updated'] = datetime.now().isoformat()
        
        lights_on = sum(room_state['lights'].values())
        power_usage = lights_on * 60
        
        return jsonify({
            'status': 'success',
            'message': f'Scene "{scene_name}" activated',
            'data': {
                'scene': scene_name,
                'lights': room_state['lights'],
                'lights_on': lights_on,
                'power_usage': power_usage,
                'timestamp': room_state['last_updated']
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
