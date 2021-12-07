import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #81888A;
`;

export const HeaderArea = styled.View`
    height: 50px;
    justify-content: center;
    padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    color: #FFFFFF;
    font-weight: bold;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
`;

export const ListArea = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const EmptyWarning = styled.Text`
    text-align: center;
    margin-top: 30px;
    color: #FFFFFF;
    font-size: 14px;
`;