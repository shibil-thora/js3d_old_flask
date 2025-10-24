# Modern Web App with Flask

A beautiful, responsive web application built with Flask, HTML, CSS, and JavaScript featuring modern design and interactive functionality.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Calculator**: Real-time calculations powered by Flask backend
- **Contact Form**: Dynamic form handling with validation
- **Smooth Navigation**: Single-page application with smooth scrolling
- **API Integration**: RESTful API endpoints for data processing
- **Mobile-First**: Optimized for mobile devices with hamburger menu

## 🛠️ Technologies Used

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design patterns
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## 📁 Project Structure

```
Js3d/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Main stylesheet
    └── js/
        └── script.js     # JavaScript functionality
```

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project**
   ```bash
   cd /home/shibil/onwords/Js3d
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` or `http://127.0.0.1:5000`

## 🎯 Usage

### Calculator
- Enter two numbers
- Select an operation (addition, subtraction, multiplication, division)
- Click "Calculate" to get the result
- Results are processed by the Flask backend

### Contact Form
- Fill out the contact form with your information
- Submit to send a message (currently simulated)
- Form includes validation for required fields

### Navigation
- Use the navigation menu to jump between sections
- Mobile users can use the hamburger menu
- Smooth scrolling between sections

## 🔧 API Endpoints

### GET /api/data
Returns sample data from the server.

**Response:**
```json
{
  "message": "Hello from Flask!",
  "data": ["Item 1", "Item 2", "Item 3"],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### POST /api/calculate
Performs mathematical calculations.

**Request:**
```json
{
  "num1": 10,
  "num2": 5,
  "operation": "add"
}
```

**Response:**
```json
{
  "result": 15
}
```

**Supported Operations:**
- `add`: Addition
- `subtract`: Subtraction
- `multiply`: Multiplication
- `divide`: Division

## 🎨 Customization

### Colors
The main color scheme uses:
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Emerald)
- Error: `#ef4444` (Red)

### Fonts
- Primary font: Inter (Google Fonts)
- Fallback: system fonts

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Local Development
The app runs in debug mode by default. For production:

1. Set `debug=False` in `app.py`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

### Cloud Deployment
This app can be deployed to:
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Google Cloud Platform
- Vercel (with serverless functions)

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Module not found errors**
   ```bash
   # Ensure virtual environment is activated
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **CSS/JS not loading**
   - Check that static files are in the correct directories
   - Ensure Flask is serving static files correctly
   - Check browser console for 404 errors

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Flask team for the excellent web framework
- Font Awesome for the beautiful icons
- Google Fonts for the Inter font family
- Modern CSS techniques and best practices

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Create an issue in the project repository

---

**Happy coding! 🎉**
