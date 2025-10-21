import React, { useState, useRef } from "react";

// アコーディオン項目コンポーネント
const AccordionItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef(null);
  const hasChildren = item.children && item.children.length > 0;

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const bodyStyle = {
    maxHeight: isOpen ? `${bodyRef.current?.scrollHeight}px` : "0",
  };

  return (
    <li className={`accordion-item ${isOpen ? "active" : ""}`}>
      <div
        className="accordion-item-header"
        onClick={toggleOpen}
        style={{ cursor: hasChildren ? "pointer" : "default" }}
      >
        <span>{item.name}</span>
        {hasChildren && <span className="arrow">{isOpen ? "▼" : "▶"}</span>}
      </div>

      {hasChildren && (
        <div className="accordion-item-body" style={bodyStyle} ref={bodyRef}>
          <ul className="accordion-item-body-content accordion">
            {item.children.map((child, index) => (
              <AccordionItem key={index} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

// サンプルデータ
const fileStructure = [
  {
    name: "public_html",
    children: [
      {
        name: "app-admin.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      {
        name: "app-super.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      {
        name: "app.kizuki.or.jp",
        children: [{ name: "default_page.png" }, { name: "index.html" }],
      },
      { name: "apple-touch-icon.png" },
      {
        name: "asset",
        children: [
          {
            name: "img",
            children: [
              { name: "131130_seminar.jpg" },
              { name: "1x1.gif" },
              { name: "92percent_new.png" },
              { name: "92percent.png" },
            ],
          },
        ],
      },
      {
        name: "assets",
        children: [
          { name: "cssmin" },
          { name: "fonts" },
          { name: "img" },
          { name: "js" },
          { name: "less" },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.app}>
        <h1 style={styles.header}>アコーディオンメニュー</h1>
        <div style={styles.scrollContainer}>
          <ul style={styles.accordion}>
            {fileStructure.map((item, index) => (
              <AccordionItem key={index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    padding: "10px",
    backgroundColor: "#fdfdfd",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  app: {
    maxWidth: "800px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    backgroundColor: "#fff",
    height: "calc(100vh - 20px)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "15px 20px",
    margin: 0,
    backgroundColor: "#f5f5f5",
    fontSize: "1.2rem",
    borderBottom: "1px solid #ddd",
    flexShrink: 0,
  },
  "@media (max-width: 768px)": {
    header: {
      fontSize: "1.1rem",
      padding: "12px 15px",
    },
  },
  "@media (max-width: 480px)": {
    header: {
      fontSize: "1rem",
      padding: "10px 12px",
    },
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
  accordion: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
};

const accordionStyles = `
  .accordion-item {
    border-bottom: 1px solid #eee;
  }
  
  .accordion-item:last-child {
    border-bottom: none;
  }
  
  .accordion-item-header {
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    background-color: #fff;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  
  .accordion-item-header:hover {
    background-color: #f9f9f9;
  }
  
  .accordion-item-header:active {
    background-color: #f0f0f0;
  }
  
  .arrow {
    color: #007bff;
    font-size: 12px;
    transition: transform 0.2s ease-out;
    flex-shrink: 0;
    margin-left: 10px;
  }
  
  .accordion-item.active > .accordion-item-header {
    font-weight: 600;
    color: #007bff;
  }
  
  .accordion-item-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background-color: #fdfdfd;
  }
  
  .accordion-item-body-content {
    padding-left: 20px;
    border-top: 1px solid #eee;
  }
  
  .accordion-item-body-content .accordion-item {
    border-bottom: none;
  }
  
  .accordion-item-body-content .accordion-item-header {
    padding: 10px 12px;
    font-weight: 400;
    background-color: #f9f9f9;
    font-size: 0.95rem;
  }
  
  .accordion-item-body-content .accordion-item-header:hover {
    background-color: #f0f0f0;
  }
  
  .accordion-item-body-content .accordion-item:not(:last-child) {
    border-bottom: 1px dotted #eee;
  }
  
  @media (max-width: 768px) {
    .accordion-item-header {
      padding: 14px 12px;
      font-size: 0.95rem;
    }
    
    .accordion-item-body-content {
      padding-left: 15px;
    }
    
    .accordion-item-body-content .accordion-item-header {
      padding: 12px 10px;
      font-size: 0.9rem;
    }
    
    .arrow {
      font-size: 11px;
    }
  }
  
  @media (max-width: 480px) {
    .accordion-item-header {
      padding: 12px 10px;
      font-size: 0.9rem;
    }
    
    .accordion-item-body-content {
      padding-left: 12px;
    }
    
    .accordion-item-body-content .accordion-item-header {
      padding: 10px 8px;
      font-size: 0.85rem;
    }
  }
`;

// スタイルを挿入
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = accordionStyles;
  document.head.appendChild(styleElement);
}

export default App;
