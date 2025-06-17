import { useState, useEffect } from "react"
import { ArrowRight, Play, Pause, SkipForward, Sparkles, MessageCircle } from "lucide-react"
import "./App.css"

function App() {
  const [currentScreen, setCurrentScreen] = useState("password")
  const [showMessage, setShowMessage] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [slideProgress, setSlideProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [textIndex, setTextIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)

  const decryptPassword = (str) => {
    return str.split('').map(char =>
      String.fromCharCode(char.charCodeAt(0) - 1)
    ).join('')
  }

  const CORRECT_PASSWORD = decryptPassword("281:")

  const SLIDE_DURATION = 2000

  const confessionTexts = [
    "lời đầu tiên anh muốn nói là cho anh xin lỗi vì đã làm việc này quá trễ",
    "sau khi nhìn lại mấy tháng vừa qua thì anh cảm thấy yêu em nhiều hơn",
    "anh yêu em không chỉ dựa theo vẻ bề ngoài mà là tính cách của em, cách em nấu đồ ăn hằng ngày cho anh, cách em lo lắng cho anh và cũng những lúc mà em mắng anh",
    "anh rất trân trọng em và anh hong muốn ai làm tổn thương tới em nữa",
    "anh mong là em sẽ không còn những suy nghĩ tiêu cực nữa, anh sẽ làm những thứ có thể để khiến em vui hơn mỗi ngày",
    "anh vẫn sẽ yêu em và không chán em vì mấy cái lí do xàm xàm đâu, nên là đừng lo lắng nhe",
    "anh mong là anh và em sẽ tiếp tục có nhiều kỉ niệm hơn nữa",
    "anh xin được hỏi lại em câu hỏi này một cách nghiêm túc ạ",
    "",
  ]

  const memories = [
    { image: "/images/IMG_1596.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1302.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3203.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3749.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1426.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1298.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1288.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1191.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3188.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1425.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1385.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1453.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1417.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3553.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1304.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1309.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3523.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1570.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1299.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3525.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3524.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1571.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3526.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3567.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3187.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1314.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1308.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1452.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1174.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1303.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3522.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1307.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1297.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1289.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1419.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1595.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1301.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1243.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1418.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1180.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1330.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1569.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1186.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1178.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/754E9AE9-8CF7-4E8F-81AB-17CCF674BBA9.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_0964.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/748B6504-CA6B-4FBD-B352-F2C4743CE73A.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/D2EDA3A5-3E22-4A80-83CE-C9FAB4CA29DF.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_4689.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_0963.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1187(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/838EDEE8-0FD2-49C0-BC44-CBFCC59B1829.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1329.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1295(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/8D79D4C8-C6BC-45F4-BE1D-DD82BE316C04.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1188(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1249(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1313.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1293.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/a.JPG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1320.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1559.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1546(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1561.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3109.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3200.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3107(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3149.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3713.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/picture_1_1747744372(1).jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/picture_1_1747744372.jpg", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3702(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3701(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3814.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3700(1).PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3824.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3816.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3818.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3822.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3819.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3825.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3826.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3830.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3821.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3827.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_1560.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3831.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3823.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3833.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3834.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3835.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3836.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3847.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
    { image: "/images/IMG_3849.PNG", title: "kỉ niệm", description: "cùng anh nhìn lại nhũng gì đã diễn ra vài tháng vừa qua nhe", color: "rose-pink" },
  ]

  // Detect mobile - iPhone 13 specific
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      // iPhone 13: 390x844 or 844x390
      setIsMobile(width <= 428 || (width <= 844 && height <= 428))
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mouse/touch tracking
  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0

      setMousePosition({
        x: (clientX / window.innerWidth - 0.5) * (isMobile ? 10 : 30),
        y: (clientY / window.innerHeight - 0.5) * (isMobile ? 10 : 30),
      })
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
    }
  }, [isMobile])

  // Auto-play slideshow
  useEffect(() => {
    if (currentScreen === "slideshow" && isPlaying) {
      const progressInterval = setInterval(() => {
        setSlideProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((prevSlide) => {
              if (prevSlide < memories.length - 1) {
                return prevSlide + 1
              } else {
                setCurrentScreen("confession")
                return prevSlide
              }
            })
            return 0
          }
          return prev + 100 / (SLIDE_DURATION / 50)
        })
      }, 50)
      return () => clearInterval(progressInterval)
    }
  }, [currentScreen, isPlaying, currentSlide, memories.length])

  // Text cycling for confession
  useEffect(() => {
    if (currentScreen === "confession" && showMessage && !showResponse) {
      const interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % confessionTexts.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentScreen, showMessage, showResponse, confessionTexts.length])

  useEffect(() => {
    setSlideProgress(0)
  }, [currentSlide])

  // Password screen
  if (currentScreen === "password") {
    return (
      <div className="screen password-screen">
        <div className="password-container">
          <h1 className="password-title">Nhập mật khẩu</h1>

          <div className="password-input-container">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`password-dot ${index < password.length ? 'filled' : ''}`}
              />
            ))}
          </div>

          {showError && (
            <p className="password-error">Incorrect password. Please try again.</p>
          )}

          <div className="password-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'delete'].map((num, index) => (
              <button
                key={index}
                className={`keypad-button ${num === '' ? 'empty' : ''}`}
                onClick={() => {
                  if (num === 'delete') {
                    setPassword(prev => prev.slice(0, -1))
                    setShowError(false)
                  } else if (password.length < 4) {
                    const newPassword = password + num
                    setPassword(newPassword)
                    if (newPassword.length === 4) {
                      if (newPassword === CORRECT_PASSWORD) {
                        setCurrentScreen("intro")
                      } else {
                        setShowError(true)
                        setTimeout(() => {
                          setPassword("")
                          setShowError(false)
                        }, 1000)
                      }
                    }
                  }
                }}
              >
                {num === 'delete' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4H2M7 4V2h10v2M5 4h14l-1.58 15.22a2 2 0 0 1-1.99 1.78H8.57a2 2 0 0 1-1.99-1.78L5 4zm5 4v10m4-10v10" />
                  </svg>
                ) : (
                  num
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Intro screen
  if (currentScreen === "intro") {
    return (
      <div className="screen intro-screen">
        {/* Floating background elements */}
        <div className="floating-bg">
          <div
            className="floating-element floating-1"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className="floating-element floating-2"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            }}
          />

          {/* Floating particles */}
          {[...Array(isMobile ? 8 : 20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                backgroundColor: ["#FFDCDC", "#FFD6BA", "#FFE8CD"][Math.floor(Math.random() * 3)],
              }}
            />
          ))}
        </div>

        <div className="content-wrapper">
          <div className="intro-header">

            <h1 className="title-xl">
              hé lô bé iu,
              <span className="title-gradient">Tân Vy</span>
            </h1>

            <p className="description-lg">
              cùng nhìn lại những tháng vừa qua nhé <span className="text-highlight">sẵn sàng chưa ạ</span>
            </p>
          </div>

          <div className="actions-center">
            <button onClick={() => setCurrentScreen("slideshow")} className="btn-primary btn-lg">
              <span className="btn-content">
                Bắt đầu nhá
                <ArrowRight className="icon-md ml-3" />
              </span>
              <div className="btn-overlay" />
            </button>
          </div>
        </div>

        <div className="footer-info">
          <div className="status-ready">
            <div className="indicator-green" />
            <span>Ready</span>
          </div>
          <span className="memory-count">{memories.length} memories</span>
        </div>
      </div>
    )
  }

  // Slideshow screen
  if (currentScreen === "slideshow") {
    const currentMemory = memories[currentSlide]

    return (
      <div className="screen slideshow-screen">
        {/* Fixed header */}
        <div className="header-fixed">
          <div className="header-container">
            <div className="header-info">
              <span className="slide-counter">
                {currentSlide + 1} of {memories.length}
              </span>
              <div className="progress-bar">
                <div
                  className={`progress-fill gradient-${currentMemory.color}`}
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
              {!isMobile && (
                <span className="time-counter">
                  {Math.floor((currentSlide * SLIDE_DURATION + (slideProgress * SLIDE_DURATION) / 100) / 1000)}s
                </span>
              )}
            </div>

            <div className="controls">
              <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 10))} className="btn-control">
                -10
              </button>
              <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} className="btn-control">
                ←
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="btn-control">
                {isPlaying ? <Pause className="icon-sm" /> : <Play className="icon-sm" />}
              </button>
              <button onClick={() => setCurrentSlide(Math.min(memories.length - 1, currentSlide + 1))} className="btn-control">
                →
              </button>
              <button
                onClick={() => setCurrentSlide(Math.min(memories.length - 1, currentSlide + 10))}
                className="btn-control"
              >
                +10
              </button>
              <button onClick={() => setCurrentScreen("confession")} className="btn-control">
                <SkipForward className="icon-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Story content */}
        <div className="slideshow-content">
          <div className="story-container">
            {/* Image */}
            <div
              className="story-image-wrapper"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ transform: `translateY(${mousePosition.y / (isMobile ? 10 : 4)}px)` }}
            >
              <div className="image-container">
                <img
                  src={currentMemory.image || "/placeholder.svg"}
                  alt={currentMemory.title}
                  className="story-image"
                />

                <div className="image-overlay" />

                <div className="play-overlay">
                  <div className="play-button">
                    {isPlaying ? <Pause className="icon-md" /> : <Play className="icon-md" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="story-content"
              style={{ transform: `translateY(${-mousePosition.y / (isMobile ? 15 : 6)}px)` }}
            >
              <div className="story-header">
                <div className="date-line">
                  <span className="story-date">{currentMemory.date}</span>
                  <div className={`line gradient-${currentMemory.color}`} />
                </div>

                <h2 className="story-title">{currentMemory.title}</h2>
              </div>

              <p className="story-description">{currentMemory.description}</p>

              {/* Progress dots */}
              <div className="progress-dots">
                {memories.slice(0, isMobile ? 15 : memories.length).map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${index === currentSlide
                        ? `active gradient-${currentMemory.color}`
                        : index < currentSlide
                          ? "completed"
                          : "pending"
                      }`}
                  />
                ))}
                {isMobile && memories.length > 15 && <div className="more-indicator">+{memories.length - 15}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Confession screen
  return (
    <div className="screen confession-screen">
      {/* Dynamic background */}
      <div className="confession-bg">
        <div
          className="confession-floating-1"
          style={{
            transform: `translate(${mousePosition.x * (isMobile ? 0.5 : 2)}px, ${mousePosition.y * (isMobile ? 0.5 : 2)}px)`,
          }}
        />
        <div
          className="confession-floating-2"
          style={{
            transform: `translate(${-mousePosition.x * (isMobile ? 0.3 : 1.5)}px, ${-mousePosition.y * (isMobile ? 0.3 : 1.5)}px)`,
          }}
        />

        {/* Floating elements */}
        {[...Array(isMobile ? 6 : 15)].map((_, i) => (
          <div
            key={i}
            className="confession-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: ["#FFDCDC", "#FFD6BA", "#FFE8CD"][Math.floor(Math.random() * 3)],
            }}
          />
        ))}
      </div>

      <div className="confession-content">
        {/* Header */}
        <div className="confession-header">
          <div className="header-actions" style={{ marginTop: "-40px" }}>
            <button 
              onClick={() => setCurrentScreen("slideshow")} 
              className="btn-control"
              style={{
                transform: `translate(${mousePosition.x * (isMobile ? 0.5 : 2)}px, ${mousePosition.y * (isMobile ? 0.5 : 2)}px)`,
              }}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                className="icon-sm"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>

          <h1 className="title-xl">dạ hết ròi ạ</h1>
          <p className="subtitle">sau tất cả, anh có vài điều muốn nói...</p>
        </div>

        {/* Message reveal */}
        {!showMessage && (
          <div className="message-reveal">
            <div className="reveal-container">
              <button onClick={() => setShowMessage(true)} className="reveal-button">
                <div className="reveal-overlay" />
                <MessageCircle className="icon-lg" />
                <div className="ping-effect" />
              </button>

              <div className="orbital-ring-1" />
              <div className="orbital-ring-2" />
            </div>

            <p className="reveal-text">em muốn nghe anh nói hong ạ?</p>
          </div>
        )}

        {/* Handwritten letter */}
        {showMessage && (
          <div className="letter-section">
            <div className="letter-wrapper">
              {/* Paper */}
              <div className="letter-paper">
                {/* Paper texture */}
                <div className="paper-texture" />

                {/* Paper holes */}
                <div className="paper-hole hole-1" />
                <div className="paper-hole hole-2" />
                <div className="paper-hole hole-3" />

                {/* Letter content */}
                <div className="letter-content">
                  {/* Date */}
                  <div className="letter-date">
                    <p className="date-text">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Greeting */}
                  <div className="letter-greeting">
                    <p className="greeting-text">Dear Tan Vy,</p>
                  </div>

                  {/* Confession text */}
                  <div className="confession-text-section">
                    <div className="text-wrapper">
                      <p className="confession-text handwriting">{confessionTexts[textIndex]}</p>
                    </div>

                    {/* Ink blot */}
                    <div className="ink-blot-wrapper">
                      <div className="ink-blot" />
                    </div>

                    {/* Final question */}
                    <div className="final-question">
                      <p className="question-text">anh có thể trở thành người có thể chăm sóc và lo lắng cho em được hong ạ?</p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="letter-signature">
                    <div className="signature-wrapper">
                      <p className="with-love">by yours,</p>
                      <div className="name-wrapper">
                        <p className="signature-name">anhbes</p>
                        <div className="signature-line" />
                      </div>
                    </div>
                  </div>

                  {/* Response buttons */}
                  {!showResponse && (
                    <div className="response-section">
                      <p className="response-prompt">:</p>

                      <div className="response-buttons">
                        <button onClick={() => setShowResponse("yes")} className="response-btn yes-btn">
                          <span className="btn-text">"có"</span>
                        </button>

                        <button onClick={() => setShowResponse("maybe")} className="response-btn maybe-btn">
                          <span className="btn-text">"không"</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="paper-shadow" />
              </div>

              {/* Paper stack effect */}
              <div className="paper-stack-1" />
              <div className="paper-stack-2" />
            </div>
          </div>
        )}

        {/* Responses */}
        {showResponse === "yes" && (
          <div className="response-container yes-response">
            <div className="response-paper">
              <div className="response-content">
                <div className="response-icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" className="response-icon">
                    <path
                      fill="currentColor"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>

                <h3 className="response-title">Anh cảm ơn ạ ❤️</h3>

                <div className="response-emojis">
                  <span>✨</span>
                  <span>💕</span>
                  <span>✨</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResponse === "maybe" && (
          <div className="response-container maybe-response">
            <div className="response-paper">
              <div className="response-content">
                <div className="response-icon-wrapper">
                  <svg width="40" height="40" viewBox="0 0 24 24" className="response-icon">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>

                <h3 className="response-title">Anh hiểu ròi ạ 🥺</h3>

                <div className="response-emojis">
                  <span>🤗</span>
                  <span>🧡</span>
                  <span>🌟</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
