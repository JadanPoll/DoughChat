#!/bin/bash

cat post_login_sample.json | http POST http://3.145.180.241:3333/user/login Content-Type:application/json
