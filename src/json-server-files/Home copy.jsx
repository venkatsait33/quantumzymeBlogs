import React, { useEffect, useState } from 'react'

const Home = () => {
  const sections = [
    {
      id: "section1",
      title: "Section 1",
      content:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum. lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, dolor sapiente? Aperiam, non consequuntur rem aliquam reprehenderit sunt quaerat, unde voluptatibus hic quibusdam molestiae earum amet similique eveniet dicta porro! ",
    },
    {
      id: "section2",
      title: "Section 2",
      content:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum. lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, dolor sapiente? Aperiam, non consequuntur rem aliquam reprehenderit sunt quaerat, unde voluptatibus hic quibusdam molestiae earum amet similique eveniet dicta porro! ",
    },
    {
      id: "section3",
      title: "Section 3",
      content:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum. lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, dolor sapiente? Aperiam, non consequuntur rem aliquam reprehenderit sunt quaerat, unde voluptatibus hic quibusdam molestiae earum amet similique eveniet dicta porro! ",
    },
  ];
   const [activeId, setActiveId] = useState ("");

   useEffect(() => {
     const observer = new IntersectionObserver((entries) => {
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           setActiveId(entry.target.id);
         }
       });
     });

     sections.forEach((section) => {
       const element = document.getElementById(section.id);
       if (element) observer.observe(element);
     });

     return () => observer.disconnect();
   }, [sections]);

  return (
    <div className="relative">
      <div className="">
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={
                  activeId === section.id ? "text-blue-500" : "text-gray-700"
                }
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 ml-64">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="py-10">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home