#!/bin/bash
CWD=$(realpath $(cd "$(dirname "$0")"; pwd))
node ${CWD}/../bin/start --host '127.0.0.1' --port 5211 --config '{"platform":{"appId":"xxxx","secret":"xxxx","token":"xxxxxx"},"wxApp":{"appId":"xxxxxxxx","secret":"xxxxxxxxxxxxxxxxx","msgPush":{"token":"xxxxxxxxxxxxxxxxxx","encodingAESKey":"xxxxxxxxxxxxxx"}},"payment":{"appId":"xxxxxxxxxx","mchId":"xxxxxxxxx","key":"xxxxxxxxxxxx","notifyUrl":"xxxxxxxxxxxxxxxxxxxx"}}'