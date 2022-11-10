import React, { useContext, useState } from "react";
import { Colors, ActivityIndicator } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { FadeInView } from "../../../components/animations/fade.animation";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { Search } from "../components/search.component";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantList } from "../components/restaurant-list.styles";
import { Text } from "../../../components/typography/text.component";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
    const { error: locationError } = useContext(LocationContext);
    const { restaurants, isLoading, error } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);
    const hasError = (!!error || !!locationError);
    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading size={50} animating={true} color={Colors.blue300} />
                </LoadingContainer>
            )}
            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)}
            />
            {isToggled && (<FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />)}

            {hasError && (
                <Spacer position="left" size="large">
                    <Text variant="error">Something went wrong retrieving the data</Text>
                </Spacer>)}
            {!hasError && <RestaurantList
                data={restaurants}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("RestaurantDetail", {
                                restaurant: item,
                            })}>
                            <Spacer position="bottom" size="large">
                                <FadeInView>
                                    <RestaurantInfoCard restaurant={item} />
                                </FadeInView>
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />}

        </SafeArea>
    );
};
