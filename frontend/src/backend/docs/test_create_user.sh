#!/bin/bash

cat post_sample.json | http POST http://localhost:3333/user/create Content-Type:application/json
