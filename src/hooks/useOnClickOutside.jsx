import { useEffect } from "react";

export default function useOnClickOutside(ref, handler){
  const isMobile = window.innerWidth <= 425;
    useEffect(() => {
      const handleResize = () => {
        if (innerWidth > 600) {
          handler(true); // 데스크탑 사이즈에서는 항상 보이게 설정
        } else {
          handler(false); // 모바일 사이즈에서는 숨기기
        }
      };

      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
            return
        }
        handler()
      }
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousedown', listener)
    
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousedown', listener)
      }
    }, [ref, handler, isMobile])
    
}