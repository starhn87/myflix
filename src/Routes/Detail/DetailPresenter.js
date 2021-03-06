import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import imdb from "../../assets/imdb.png";

const Container = styled.div`
    position: relative;
    padding: 50px;
    width: 100%;
    height: calc(100vh - 50px);
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 15px;
`;

const Title = styled.h3`
    float: left;
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
    padding-top: 15px;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    width: 70%;
    line-height: 1.5;
    font-size: 12px;
    opacity: 0.7;
`;

const ILink = styled.a`
    margin-left: 20px;
    width: 100px;
    height: 10px;
    &:hover {
        text-decoration: underline;
    }
`;

const Img = styled.img`
    width: 33px;
    height: 17px;
    vertical-align: -4px;
`;

const Iframe = styled.iframe`
    margin-top: 30px;
    width: 70%;
    height: 60%;
`;

const DetailPresenter = ({
    result,
    loading,
    error
}) => (
    loading ? (
        <>
            <Helmet>
                <title>Loading | Jimmyflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        error ? (
            <Message color="#e74c3c" text={error}></Message>
        ) : (
            <Container>
                <Helmet>
                    <title>{result.original_title ? result.original_title : result.original_name} | Jimmyflix</title>
                </Helmet>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                <Content>
                    <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")} />
                    <Data>
                        <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                        <ItemContainer>
                            <Item>
                                {result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime ? result.runtime : result.episode_runtime} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / `)}
                            </Item>
                            <ILink target="_blank" href={`https://www.imdb.com/title/${result.imdb_id}`}>
                                <Img src={imdb}></Img>
                            </ILink>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        {!result.video && result.videos.results && result.videos.results.length > 0 &&
                            result.videos.results.filter((video, index) => index === 0).map(video => {
                                return (
                                    <Iframe
                                        key={video.key}
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title="Embedded youtube official trailer">
                                    </Iframe>
                                )
                            })
                        }
                    </Data>
                </Content>
            </Container>
        )));

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailPresenter;

