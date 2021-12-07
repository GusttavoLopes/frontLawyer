import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import LawyerModal from '../../components/LawyerModal'; 

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import { 
    Container,
    Scroller,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,

    FakeSwiper,
    
    PageBody,
    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    ServiceArea,
    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody,

    BackButton,
    LoadingIcon,

    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicesTitle,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseBtnText
} from './styles';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        const getLawyerInfo = async () => {
            setLoading(true);

            let json = await Api.getLawyer(userInfo.id);
            if(json.error == '') {
               setUserInfo(json.data);
               setFavorited(json.data.favorited);
            } else {
                alert("Erro: "+json.error);
            }

            setLoading(false);
        }
        getLawyerInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick= () => {
        setFavorited( !favorited );
        Api.setFavorite( userInfo.id );
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>    
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ?
                                <FavoriteFullIcon width="24" fill="#FF0000" />
                                :
                                <FavoriteIcon width="24" fill="#FF0000" />
                            }
                        </UserFavButton>
                    </UserInfoArea>

                    {loading &&
                        <LoadingIcon size="large" color="#000000" />
                    }

                    {userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>Lista de Serviços</ServicesTitle>

                            {userInfo.services.map((item, key)=> (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}

                        </ServiceArea>
                    }

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{height: 110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                            >    
                                {userInfo.testimonials.map((item, key)=>(
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>

            <LawyerModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    );
}