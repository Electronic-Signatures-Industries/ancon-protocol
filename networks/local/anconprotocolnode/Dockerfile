FROM golang:1.17.1-bullseye

# Install minimum necessary dependencies
ENV PACKAGES curl make git libc-dev bash gcc jq libc6 libc6-dev
RUN apt-get update -y && apt-get install -y $PACKAGES 

ARG HOME

# Set working directory for the build
WORKDIR /

# Add source files
COPY ancon-protocold .
COPY docker.sh init.sh


RUN mkdir -p /root/go/bin/ && cp ancon-protocold /root/go/bin/ancon-protocold && ls /root/go/bin
RUN chmod +x init.sh
RUN chmod +x ancon-protocold && cp ancon-protocold /usr/local/bin/ancon-protocold


# Copy over binaries from the build-env
# COPY --from=build-env /go/src/github.com/Electronic-Signatures-Industries/ancon-evm/build/ethermintd /
# COPY init.sh .

EXPOSE 26656 26657 1317 8545 8546

# Run ethermintd by default, omit entrypoint to ease using container with ethermintd
ENTRYPOINT ["/bin/bash", "init.sh"]
