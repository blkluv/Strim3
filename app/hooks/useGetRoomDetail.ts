import { useMutation, useQuery } from "react-query";
import { RoomDetial, roomsService } from "../api/roomsService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export const useGetRoomDetail = () => {
  const [roomDetail, setRoomDetail] = useState<RoomDetial>();
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const { address } = useAccount();

  const { mutate: getRoomDetail, isLoading: getRoomDetailIsLoading } =
    useMutation({
      mutationKey: "getRoomDetail",
      mutationFn: (roomId: string) => roomsService.getRoomDetail(roomId),
      onSuccess: (res) => {
        if (res.hostWalletAddress[0] == address) {
          setIsHost(true);
        } else {
          setIsGuest(true);
        }
        setRoomDetail(res);
      },
      onError: (error) => {
        toast.error("Get room failed");
      },
    });

  return {
    isHost,
    isGuest,
    roomDetail,
    getRoomDetail,
    getRoomDetailIsLoading,
  };
};
