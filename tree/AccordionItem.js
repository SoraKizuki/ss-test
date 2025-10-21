import React, { useState, useRef } from "react";

/**
 * 再帰的なアコーディオン項目コンポーネント
 * @param {object} props
 * @param {object} props.item - 表示するアイテムのデータ { name: string, children?: item[] }
 */
const AccordionItem = ({ item }) => {
  // アコーディオンが開いているかどうかを管理するstate
  const [isOpen, setIsOpen] = useState(false);

  // アニメーションのためにコンテンツ部分の実際の高さを取得するためのref
  const bodyRef = useRef(null);

  // itemにchildrenがあり、かつ0件以上ある場合にtrue
  const hasChildren = item.children && item.children.length > 0;

  // ヘッダーがクリックされたときの処理
  const toggleOpen = () => {
    // 子がある場合のみ開閉する
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  // bodyのスタイルを動的に設定（maxHeightをトグル）
  // 参照(ref)を使って、中身のコンテンツの実際の高さを取得し、maxHeightに設定
  const bodyStyle = {
    maxHeight: isOpen ? `${bodyRef.current?.scrollHeight}px` : "0",
  };

  return (
    <li className={`accordion-item ${isOpen ? "active" : ""}`}>
      <div
        className="accordion-item-header"
        onClick={toggleOpen}
        // 子がなければカーソルをデフォルトに
        style={{ cursor: hasChildren ? "pointer" : "default" }}
      >
        {/* アイテムの名前を表示 */}
        {item.name}
      </div>

      {/* 子がある場合のみ、開閉するボディ部分をレンダリング */}
      {hasChildren && (
        <div className="accordion-item-body" style={bodyStyle} ref={bodyRef}>
          {/* 子要素をulでラップし、それぞれの子要素を
            再度AccordionItemコンポーネントとしてレンダリング（これが再帰です）
          */}
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

export default AccordionItem;
