from pyzk import ZK
import datetime

 
DEVICE_IP = '192.168.1.201'
DEVICE_PORT = 4370

zk = ZK(DEVICE_IP, port=DEVICE_PORT)
conn = None

try:
    print("Connecting to ZKTeco device...")
    conn = zk.connect()
    print("Connection successful.")

   
    attendance_logs = conn.get_attendance()

    if attendance_logs:
        print("Attendance logs retrieved:")
        for log in attendance_logs:
            print(f"User ID: {log.user_id}, Timestamp: {log.timestamp}, Status: {log.status}")
    else:
        print("No attendance logs found.")

except Exception as e:
    print(f"Error: {e}")

finally:
    if conn:
        conn.disconnect()
        print("Disconnected from device.")