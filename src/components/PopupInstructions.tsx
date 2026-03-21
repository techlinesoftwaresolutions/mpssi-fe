import React from 'react';

interface PopupInstructionsProps {
  isVisible: boolean;
  onClose: () => void;
  isAgreementChecked: boolean;
  onAgreementChange: (checked: boolean) => void;
}

const PopupInstructions: React.FC<PopupInstructionsProps> = ({
  isVisible,
  onClose,
  isAgreementChecked,
  onAgreementChange,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">दिशा-निर्देश (फॉर्म भरने से पहले ध्यानपूर्वक पढ़ें)</h2>
        <p className="text-sm mb-2">
          यह फॉर्म महर्षि प्रजापति समिति, शुक्रतीर्थ के लिए डेटा एकत्र करेगा, जिसका कोई अन्य उपयोग नहीं किया जाएगा।
        </p>
        <p className="text-sm mb-2">
          कृपया सभी विवरण मार्कशीट के अनुसार और पूरी जिम्मेदारी से भरें। बाद में सत्यापन किया जाएगा।
        </p>
        <p className="text-sm mb-2">
          कृपया पूरा फॉर्म अंग्रेज़ी में ही भरें, क्योंकि हिंदी में भरने में आपको कठिनाई हो सकती है।
        </p>
        <p className="text-sm mb-2">
          यह फॉर्म केवल शैक्षणिक सत्र 2025-26 के लिए मान्य है और इसी वर्ष का डेटा एकत्र करता है।
        </p>
        <p className="text-sm mb-4">
          इस फॉर्म को केवल वही अभ्यर्थी भरें:
        </p>
        <ul className="list-disc list-inside text-sm mb-4">
          <li>जिन्होंने इस वर्ष परीक्षा उत्तीर्ण की है।</li>
          <li>जिन्होंने 10वीं में कम से कम 75% या 12वीं में कम से कम 70% अंक प्राप्त किए हैं।</li>
          <li>जिन्होंने ग्रेजुएशन में 60% और उससे अधिक अंक प्राप्त किए हैं।</li>
        </ul>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agreement"
            checked={isAgreementChecked}
            onChange={(e) => onAgreementChange(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agreement" className="text-sm">मैंने दिशा-निर्देश पढ़ लिए हैं और सहमत हूं।</label>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          स्वीकार करें
        </button>
      </div>
    </div>
  );
};

export default PopupInstructions;