import Carousel from "@/src/components/testCarousel/Carousel";
import UserPublicInfos from "@/src/components/UserProfilPublic/UserPublicInfos";

const imageList = [
  { 
    id: "1",
    url: "https://picsum.photos/id/950/5000/3333"
},
  {
  id: "2",
  url: "https://picsum.photos/id/306/1024/768",
},
  {
    id: "3",
  url: "https://picsum.photos/id/791/5000/3333"
},

  {
    id: "4",
  url: "https://picsum.photos/id/1073/5000/3333"
},

  {
    id: "5",
  url: "https://picsum.photos//id/947/5000/3333"
},

  {
    id: "6",
  url: "https://picsum.photos/id/855/5000/3333"
},

  {
    id: "7",
  url: "https://picsum.photos/id/783/4096/2731"
},

  {
    id: "8",
  url: "https://picsum.photos//id/867/4288/2848"
},
  
  {
    id: "9",
  url: "https://picsum.photos/id/846/4000/3000"
},
  { 
    id: "10",
    url: "https://picsum.photos/id/881/3000/2000"
},
  {
  id: "11",
  url: "https://picsum.photos/id/723/5000/3333",
},
  {
    id: "12",
  url: "https://picsum.photos/id/679/2448/2448"
},

  {
    id: "13",
  url: "https://picsum.photos/id/639/2365/1774"
},

];

export default function UserPublic() {
  return (
    <div className="mx-4 md:mx-auto md:w-4/5">
      <div className="mt-4 sm:mt-2 md:mt-10">
        <UserPublicInfos />
      </div>
      <section className="h-full md:h-2/3 mt-20">
        <div className='relative flex mt-8 mb-4 w-full md:w-2/5'>
          <h3 className="text-xl font-extrabold mx-auto md:ml-20">
            Oeuvres ajoutées aux favoris
          </h3>
        </div>
        <div className='h-160 flex'>
        <Carousel imageList={imageList} page="user" />
        </div>
      </section>
    </div>
  );
}