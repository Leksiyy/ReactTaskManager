import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import '../../index.css';

export const AddTaskButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  return (
    <div 
      onClick={() => {
        setIsPressed(true);
        onClick();
        setTimeout(() => setIsPressed(false), 300);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        position: 'relative',
        height: '300px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isHovered 
          ? '0 12px 28px rgba(24, 144, 255, 0.2), 0 5px 10px rgba(24, 144, 255, 0.1)' 
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: isPressed 
          ? 'scale(0.98) translateY(-2px)' 
          : isHovered 
          ? 'translateY(-8px)' 
          : 'translateY(0)',
      }}
    >
      {/* Glass morphism background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(240, 249, 255, 0.8) 0%, rgba(230, 247, 255, 0.8) 50%, rgba(186, 231, 255, 0.8) 100%)' 
          : 'linear-gradient(135deg, rgba(250, 250, 250, 0.7) 0%, rgba(245, 245, 245, 0.7) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: isHovered 
          ? '1px solid rgba(255, 255, 255, 0.7)' 
          : '1px solid rgba(233, 233, 233, 0.7)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4)',
        transition: 'all 0.4s ease',
      }}/>
      
      {/* Background gradient pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isHovered ? 0.7 : 0.3,
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                    rgba(24, 144, 255, 0.2) 0%, 
                    rgba(24, 144, 255, 0.1) 20%, 
                    transparent 60%)`,
        transition: 'opacity 0.4s ease',
        zIndex: 0,
      }}/>
      
      {/* Animated decorative elements */}
      {isHovered && (
        <>
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                top: `${15 + i * 15}%`,
                left: `${10 + i * 15}%`,
                width: `${8 + i * 2}px`,
                height: `${8 + i * 2}px`,
                borderRadius: '50%',
                background: `rgba(24, 144, 255, ${0.2 + i * 0.05})`,
                transition: 'all 0.5s ease',
                animation: `addTaskButton-float ${3 + i * 0.5}s infinite ease-in-out ${i * 0.3}s`,
                zIndex: 0,
              }}
            />
          ))}
          
          {/* Geometric shapes */}
          <div 
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '12%',
              width: '20px',
              height: '20px',
              borderRadius: '4px',
              background: 'rgba(24, 144, 255, 0.3)',
              transform: 'rotate(45deg)',
              animation: 'addTaskButton-rotate 7s infinite linear',
              zIndex: 0,
            }}
          />
          
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              right: '15%',
              width: '14px',
              height: '14px',
              borderRadius: '2px',
              border: '2px solid rgba(24, 144, 255, 0.4)',
              background: 'transparent',
              animation: 'addTaskButton-pulse 4s infinite ease-in-out',
              zIndex: 0,
            }}
          />
        </>
      )}
      
      {/* Content container */}
      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        zIndex: 2,
      }}>
        {/* Animated button with ripple effect */}
        <div style={{
          position: 'relative',
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: isHovered 
            ? 'linear-gradient(135deg, #40a9ff 0%, #1890ff 100%)' 
            : 'rgba(24, 144, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          transition: 'all 0.3s ease',
          transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHovered 
            ? '0 8px 16px rgba(24, 144, 255, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.4)' 
            : 'none',
        }}>
          <PlusOutlined style={{ 
            fontSize: '36px', 
            color: isHovered ? 'white' : '#1890ff',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))' : 'none',
          }} />
          
          {/* Inner glow */}
          {isHovered && (
            <div style={{
              position: 'absolute',
              inset: '-3px',
              borderRadius: '50%',
              background: 'transparent',
              border: '2px solid rgba(24, 144, 255, 0.2)',
              filter: 'blur(2px)',
            }}/>
          )}
        </div>
        
        {/* Modern text card with blurred background */}
        <div style={{
          opacity: isHovered ? 1 : 0.7,
          transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all 0.4s ease',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          backdropFilter: isHovered ? 'blur(8px)' : 'none',
          padding: '16px',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '220px',
          boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.04)' : 'none',
        }}>
          <h3 style={{ 
            fontSize: '22px', 
            margin: '0 0 8px 0',
            color: isHovered ? '#1890ff' : '#262626',
            fontWeight: 600,
            letterSpacing: '-0.5px',
          }}>
            Create New Task
          </h3>
          <p style={{ 
            fontSize: '15px',
            margin: 0,
            color: isHovered ? '#5a5a5a' : '#8c8c8c',
            lineHeight: 1.5,
          }}>
            Click to add a new task to your collection
          </p>
        </div>
      </div>

      {/* Multiple expanding rings for a more dynamic effect */}
      {isHovered && (
        <>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid rgba(24, 144, 255, 0.15)',
            transform: 'translate(-50%, -50%)',
            animation: 'addTaskButton-expand 2.5s infinite ease-out',
            zIndex: 0,
          }}/>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1px solid rgba(24, 144, 255, 0.1)',
            transform: 'translate(-50%, -50%)',
            animation: 'addTaskButton-expand 2.5s infinite ease-out 0.5s',
            zIndex: 0,
          }}/>
        </>
      )}
    </div>
  );
};