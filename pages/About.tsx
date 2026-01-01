import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Section } from '../components/Section';

export const About = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
    <Section title="Our Legacy" subtitle="History & Vision" className="pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg text-gray-600 mx-auto leading-relaxed">
          <p className="mb-6">
            <strong>महार्षि प्रजापति शिक्षा समिति</strong> की स्थापना वर्ष 1989 में सुखेड़ताल, जनपद मुज़फ्फरनगर (उत्तर प्रदेश) में कुछ दूरदर्शी एवं समाजसेवी व्यक्तियों द्वारा की गई थी। उस समय ग्रामीण क्षेत्र में शिक्षा के सीमित संसाधनों और विद्यार्थियों को हो रही कठिनाइयों को देखते हुए इन समाजसेवियों ने शिक्षा को समाज सुधार का माध्यम बनाने का संकल्प लिया।
          </p>
          <p className="mb-6">
            स्थापना के प्रारंभिक वर्षों में समिति ने सीमित संसाधनों के साथ कार्य आरंभ किया, किंतु सेवा, समर्पण और सामाजिक सहयोग के बल पर आज यह समिति 35 वर्षों से अधिक की निरंतर यात्रा पूरी कर चुकी है। वर्तमान में यह एक पंजीकृत एवं प्रतिष्ठित सामाजिक संस्था के रूप में कार्य कर रही है, जो प्रतिवर्ष सैकड़ों विद्यार्थियों को शिक्षा, छात्रवृत्ति, सम्मान समारोह तथा सामाजिक जागरूकता कार्यक्रमों के माध्यम से सहयोग प्रदान करती है।
          </p>
          <p className="mb-6">
            समिति का यह दृढ़ विश्वास है कि शिक्षा केवल अक्षर ज्ञान तक सीमित नहीं है, बल्कि यह व्यक्ति के चारित्रिक, बौद्धिक और सामाजिक विकास का आधार है। इसी विचारधारा के साथ समिति समाज के कमजोर और वंचित वर्गों तक शिक्षा की पहुँच सुनिश्चित करने के लिए सतत प्रयासरत है।
          </p>
          <blockquote className="border-l-4 border-saffron-600 pl-8 italic text-gray-800 bg-saffron-50 p-8 rounded-2xl my-10 shadow-sm">
            "हमारा उद्देश्य केवल साक्षरता फैलाना नहीं, बल्कि ऐसे जागरूक, संस्कारित और जिम्मेदार युवाओं का निर्माण करना है, जो समाज और राष्ट्र के लिए सुदृढ़ स्तंभ बन सकें।"
          </blockquote>
          <p className="mb-6">
            महार्षि प्रजापति शिक्षा समिति भविष्य में भी शिक्षा, सेवा और सामाजिक उत्थान के अपने मूल्यों के साथ निरंतर कार्य करती रहेगी।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
             <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Vision</h3>
             <p className="text-gray-600 mb-6">To create an enlightened society where every child, regardless of their economic background, has access to quality education and equal opportunities for growth.</p>
             <h3 className="text-xl font-bold font-heading mb-4 text-gray-900">हमारी दृष्टि</h3>
             <p className="text-gray-600 italic text-sm">एक ऐसे समाज का निर्माण करना जहाँ आर्थिक पृष्ठभूमि की परवाह किए बिना हर बच्चे को गुणवत्तापूर्ण शिक्षा और विकास के समान अवसर प्राप्त हों।</p>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
             <h3 className="text-2xl font-bold font-heading mb-4 text-gray-900">Our Mission</h3>
             <ul className="space-y-4 text-gray-600 mb-6">
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Financial support for needy students.</li>
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Promoting cultural values and heritage.</li>
               <li className="flex gap-3"><CheckCircle size={20} className="text-saffron-600 shrink-0" /> Encouraging merit through awards.</li>
             </ul>
             <h3 className="text-xl font-bold font-heading mb-4 text-gray-900">हमारा लक्ष्य</h3>
             <ul className="space-y-3 text-gray-600 italic text-sm">
               <li className="flex gap-3"><CheckCircle size={16} className="text-saffron-600 shrink-0" /> आर्थिक रूप से कमजोर छात्रों को आर्थिक सहयोग प्रदान करना।</li>
               <li className="flex gap-3"><CheckCircle size={16} className="text-saffron-600 shrink-0" /> सांस्कृतिक मूल्यों और विरासत को बढ़ावा देना।</li>
               <li className="flex gap-3"><CheckCircle size={16} className="text-saffron-600 shrink-0" /> योग्यता को पुरस्कार के माध्यम से प्रोत्साहित करना।</li>
             </ul>
          </div>
        </div>
      </div>
    </Section>
  </motion.div>
);