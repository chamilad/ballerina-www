/*
 * Copyright (c) 2018, WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.ballerinalang.platform.playground.api.dto;

/**
 * Run Command
 */
public class RunCommand extends Command {

    private String fileName;

    private String source;

    private String curl;

    private int noOfCurlExecutions;

    private String dependantService;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getCurl() {
        return curl;
    }

    public void setCurl(String curl) {
        this.curl = curl;
    }

    public int getNoOfCurlExecutions() {
        return noOfCurlExecutions;
    }

    public void setNoOfCurlExecutions(int noOfCurlExecutions) {
        this.noOfCurlExecutions = noOfCurlExecutions;
    }

    public String getDependantService() {
        return dependantService;
    }

    public void setDependantService(String dependantService) {
        this.dependantService = dependantService;
    }
}
