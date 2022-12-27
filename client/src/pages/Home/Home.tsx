import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button, Toggle } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useLogout from '~/hooks/queries/auth/useLogout';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
import userGetMe from '~/hooks/queries/user/useGetMe';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import roomSocket from '~/lib/sockets/roomSocket';
import RoomListContent from './RoomListContent';

const Home = () => {
  const navigate = useNavigate();
  const handleGithubLogin = () => {
    navigate('/loading');
    window.location.href = 'http://localhost:8080/auth/github';
  };
  const handleKakaoLogin = () => {
    navigate('/loading');
    window.location.href = 'http://localhost:8080/auth/kakao';
  };
  useEffect(() => {
    roomSocket.createRoomSocket();
    roomSocket.socket?.on('connect', () => {
      console.log('connected');
    });
    roomSocket.socket?.on('disconnect', () => {
      console.log('disconnected');
    });
    roomSocket.socket?.emit('join', 1);
    roomSocket.socket?.on('join', (data) => {
      console.log(data);
    });
  }, []);

  const openLoginDialog = useOpenLoginDialog();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(userGetMe.getKey());
  const { mutate } = useLogout({
    onSuccess: () => {
      queryClient.invalidateQueries(userGetMe.getKey());
    },
  });

  return (
    <div>
      <Button shadow color="secondary" onClick={openLoginDialog}>
        Login
      </Button>
      <Toggle labelText="Toggle" />
      <Button shadow color="secondary" onClick={handleGithubLogin}>
        GITHUB LOGIN
      </Button>
      <Button shadow color="success" onClick={handleKakaoLogin}>
        KAKAO LOGIN
      </Button>
      <Button shadow color="error" onClick={() => mutate()}>
        로그아웃
      </Button>
      <div>{JSON.stringify(user)}</div>
      <AsyncBoundary
        rejectedFallback={
          <ErrorFallback
            message={MESSAGE.ERROR.LOAD_DATA}
            queryKey={useGetRoomList.getKey()}
          />
        }
      >
        <RoomListContent />
      </AsyncBoundary>
    </div>
  );
};

export default Home;
