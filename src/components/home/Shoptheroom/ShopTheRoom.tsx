import { getRoomSceneAction } from '@/actions/content/room-hotspots/getRoomSceneAction';
import { getRoomHotspotsAction } from '@/actions/content/room-hotspots/getRoomHotspotsAction';
import ShopTheRoomClient from './ShopTheRoomClient';
import roomImage from '@/assets/background/Shoptheroom.webp';

export default async function ShopTheRoom() {
  const [imageUrl, hotspots] = await Promise.all([getRoomSceneAction(), getRoomHotspotsAction()]);

  return <ShopTheRoomClient imageUrl={imageUrl ?? roomImage.src} hotspots={hotspots} />;
}
