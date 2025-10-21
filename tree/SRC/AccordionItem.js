import React, { useState, useRef, useEffect, useId, useCallback } from "react";

/**
 * 再帰的なアコーディオン項目コンポーネント
 * @param {Object} props
 * @param {Object} props.item - 表示するアイテムのデータ
 * @param {string} props.item.name - アイテムの名前
 * @param {string} [props.item.id] - アイテムの一意なID
 * @param {Array} [props.item.children] - 子アイテムの配列
 * @param {number} [props.level=0] - ネストレベル（アクセシビリティ用）
 * @param {Function} [props.onHeightChange] - 高さ変更時のコールバック
 */
const AccordionItem = ({ item, level = 0, onHeightChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef(null);

  // React 18のuseIdを使用して一意のIDを生成
  const uniqueId = useId();
  const headerId = `accordion-header-${uniqueId}`;
  const bodyId = `accordion-body-${uniqueId}`;

  const hasChildren = Boolean(item.children?.length);

  // 高さ更新関数
  const updateHeight = useCallback(() => {
    const bodyElement = bodyRef.current;
    if (!bodyElement) return;

    if (isOpen) {
      bodyElement.style.maxHeight = `${bodyElement.scrollHeight}px`;
    } else {
      bodyElement.style.maxHeight = "0";
    }
  }, [isOpen]);

  // 開閉状態の管理
  useEffect(() => {
    updateHeight();
  }, [isOpen, updateHeight]);

  // 子要素の高さ変更を親に通知
  const handleChildHeightChange = useCallback(() => {
    if (isOpen && bodyRef.current) {
      bodyRef.current.style.maxHeight = `${bodyRef.current.scrollHeight}px`;
      // 親にも通知
      if (onHeightChange) {
        onHeightChange();
      }
    }
  }, [isOpen, onHeightChange]);

  // 高さ変更の監視（最適化版）
  useEffect(() => {
    if (!isOpen || !hasChildren) return;

    const bodyElement = bodyRef.current;
    if (!bodyElement) return;

    const observer = new MutationObserver(() => {
      handleChildHeightChange();
    });

    observer.observe(bodyElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [isOpen, hasChildren, handleChildHeightChange]);

  // 開閉トグル処理
  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
      // 親に高さ変更を通知（アニメーション完了後）
      if (onHeightChange) {
        setTimeout(() => onHeightChange(), 350);
      }
    }
  };

  // キーボードイベント処理
  const handleKeyDown = (event) => {
    if (!hasChildren) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <li className={`accordion-item${isOpen ? " active" : ""}`}>
      <div
        className="accordion-item-header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-controls={hasChildren ? bodyId : undefined}
        tabIndex={hasChildren ? 0 : -1}
        id={headerId}
        style={{ cursor: hasChildren ? "pointer" : "default" }}
      >
        <span>{item.name}</span>
        {hasChildren && (
          <span className="arrow" aria-hidden="true">
            {isOpen ? "▼" : "▶"}
          </span>
        )}
      </div>

      {hasChildren && (
        <div
          className="accordion-item-body"
          ref={bodyRef}
          id={bodyId}
          role="region"
          aria-labelledby={headerId}
        >
          <ul className="accordion-item-body-content accordion">
            {item.children.map((child, index) => (
              <AccordionItem
                key={child.id || `${item.id}-${index}`}
                item={child}
                level={level + 1}
                onHeightChange={handleChildHeightChange}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default AccordionItem;
