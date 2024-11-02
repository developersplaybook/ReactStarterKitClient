import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PhotoFrame from "../photos/PhotoFrame";
import { Animate, AnimateKeyframes } from "react-simple-animate";
import { useGlobalState } from '../contexts/GlobalStateContext';
import InfoMessage from './InfoMessage';
import UpcomingFeatures from './UpcomingFeatures';

const Home = () => {
  const [play, setPlay] = useState(false);

  const { apiAddress } = useGlobalState();
  let currentTicks = new Date().getTime();
  const imageUrl = `${apiAddress}/RandomHandler/Index/PhotoID=0/Size=M?${currentTicks}`;
  const downloadUrl = `${apiAddress}/RandomHandler/Download/0/Size=M?${currentTicks}`;
  const detailsRoute = `/photodetails/0`;


  useEffect(() => {
      setPlay(true);

      // Load the weather widget script
      const script = document.createElement("script");
      script.src = "https://weatherwidget.io/js/widget.min.js";
      script.async = true;
      document.body.appendChild(script);

      currentTicks = new Date().getTime();

  }, []);

  const animationProps = {
    start: { opacity: 0 },
    end: { opacity: 1 },
  };

  const animatedImage =
    <Animate play={play} duration={3} {...animationProps}>
      <AnimateKeyframes
        play={play}
        iterationCount={10}
        duration={0.2}
        direction="normal"
        keyframes={[
          "transform: rotate(0)",
          "transform: rotate(360deg)"
        ]}
      >
        <AnimateKeyframes
          play={play}
          iterationCount="1"
          direction="alternate"
          duration={2}
          keyframes={[
            "transform: scaleX(1) scaleY(1)",  // Start from big size
            "transform: scaleX(0.9) scaleY(0.9)",
            "transform: scaleX(0.85) scaleY(0.85)",
            "transform: scaleX(0.8) scaleY(0.8)",
            "transform: scaleX(0.75) scaleY(0.75)",
            "transform: scaleX(0.7) scaleY(0.7)",
            "transform: scaleX(0.65) scaleY(0.65)",
            "transform: scaleX(0.6) scaleY(0.6)",
            "transform: scaleX(0.55) scaleY(0.55)",
            "transform: scaleX(0.5) scaleY(0.5)",
            "transform: scaleX(0.45) scaleY(0.45)",
            "transform: scaleX(0.4) scaleY(0.4)",
            "transform: scaleX(0.35) scaleY(0.35)",
            "transform: scaleX(0.3) scaleY(0.3)",
            "transform: scaleX(0.25) scaleY(0.25)",
            "transform: scaleX(0.2) scaleY(0.2)",
            "transform: scaleX(0.15) scaleY(0.15)",
            "transform: scaleX(0.1) scaleY(0.1)",
            "transform: scaleX(0.05) scaleY(0.05)"
          ]}
        >
          <PhotoFrame>
            <Link to={detailsRoute}>
              <img
                onLoad={() => setPlay(true)}
                src={imageUrl}
                alt=""
                style={{
                  border: "4px solid white",
                  maxHeight: "100%",
                  maxWidth: "100%",
                  verticalAlign: "middle",
                }}
              />
            </Link>
          </PhotoFrame>
        </AnimateKeyframes>
      </AnimateKeyframes>
    </Animate>

  return (
    <div className="container">
      <div className="row">
        <div className="row-height">
          <div className=" col-md-3 hidden-md hidden-sm hidden-xs col-md-height col-md-top custom-vertical-left-border custom-vertical-right-border grey-background">
            <div className="row">
              <div className="col-md-12">
                <h4 />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-primary center-block">
                  <div className="panel-heading text-center">
                    <h3 className="panel-title">Today's photo</h3>
                  </div>
                  <div className="panel-body">
                    <div className="row text-center">
                      <div className="col-md-12" id="divSwirl">
                        {animatedImage}
                      </div>
                    </div>
                    <div className="row text-center">
                      <hr />
                      <div id="divText" style={{ minHeight: "60px" }}>
                        Photos
                      </div>
                      <div id="divDownload" style={{ minHeight: "50px" }}>
                        <p>
                          <a href={downloadUrl}>
                            <img
                              src="/assets/images/button-download.gif"
                              alt="download photo"
                            />
                          </a>
                        </p>
                        <hr />
                        <p>
                          See <Link to="/albums">more photos</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="divContact" style={{ minHeight: "90px" }}>
                  <Animate
                    play={play}
                    duration={3}
                    {...animationProps}
                    delay={1}
                  >
                    <h4>Contact information</h4>
                    <p>
                      &nbsp;&nbsp;
                      <span
                        className="glyphicon glyphicon-phone-alt"
                        style={{ color: "gray" }}
                      />
                      &nbsp;010-123 456
                    </p>
                    <p>
                      <img
                        src="/assets/images/mail.png"
                        alt="epost"
                        className="img-responsive"
                      />
                    </p>
                  </Animate>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel panel-primary">
                      <div className="panel-heading">
                        <h3 className="panel-title text-center">
                          Today's weather
                        </h3>
                      </div>
                      <div className="panel-body panel-height_small">
                        <div
                          id="divWeather"
                          style={{ verticalAlign: "textTop" }}
                        >
                          <Animate
                            play={play}
                            duration={3}
                            delay={2.1}
                            {...animationProps}
                          >
                            <a
                              className="weatherwidget-io"
                              href="https://forecast7.com/en/40d71n74d01/new-york/"
                              data-label_1="NEW YORK"
                              data-label_2="WEATHER"
                              data-theme="original"
                            >
                              NEW YORK WEATHER
                            </a>
                          </Animate>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-md-height">
            <div className="row">
              <div className="col-md-12">
                <h4 />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Welcome to React Starter Kit Client</h3>
                  </div>
                  <div className="panel-body">
                    <InfoMessage/>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">Upcoming features</h3>
                  </div>
                  <div className="panel-body">
                    <UpcomingFeatures/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
