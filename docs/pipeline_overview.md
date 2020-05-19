---
id: pipeline_overview
title: Pipeline Overview
sidebar_label: Overview
---

# Running external scripts in the pipeline
(Documentation is in progress)

![Pipeline AWS Infrastructure](img/pipeline.png)

## Structure 
- A pipeline processing package should have an entry file which we will infer the pipeline name from (ex. usnvc).
- The package can implement any number of process methods, however, the developer should strive to use the minimum number required.
- The processing methods should be named `process_1(...)`, `process_2(...)`, . . . , `process_nn(...)` ect.
- A process method must take less then 15 minutes to execute. If it takes more consider breaking the logic out into an additional step. 
- Total dependencies should be less then 250MB
- Each process method has an identical signature described below.


##  Method Signature for `process_nn(path, ch_ledger, send_final_result, send_to_stage, previous_stage_result)`
### Parameters
- `path`: The location of source data requested by this pipeline
- [`ch_ledger`](#changeledger-class): An instance of the change leger class.
    - Example: `ch_ledger.log_change_event("field_id", "fieldChanger.py", "changeField", "Field Creation", "Creating feature_id field from REG_NUM", source_data, changed_data)`
- [`send_final_result`](#send_final_resultfinal_result-method): Instance of a method that accepts a python object representation of a single row of completed, processed data
    - Example: `send_final_result({"row_id": "1234", "data": { "foo": "bar"... } })`
- [`send_to_stage`](#send_to_stagedata-stage-method): Instance of a method that accepts a python object representation of a single row of data that will be processed by the next stage and the integer stage to send it to. 
    - Example: `send_to_stage({"any": "data"}, 2)`
- `previous_stage_result`: The python object from the previous stage provided by the developer when calling send_to_stage.
### Returns
- A single integer representing the number of rows manipulated by the method.

# Provided Methods/Classes
## `ChangeLedger` Class
### `log_change_event(row_id, file_name, function_name, change_name, change_description, source, result)`
#### Parameters
* `row_id` (`string`) the unique identifier for the row of data
* `file_name` (`string`) the name of the file making the change
* `function_name` (`string`) the name of the function making the change
* `change_name` (`string`) change name, should be short for searching against
* `change_description` (`string`) detailed descripition of the change
* `source` (`object`) data before the change, validated against a json schema if provided
* `result` (`object`) data after the change, validated against a json schema if provided

#### Returns
`None` or json schema validation error

## `send_final_result(final_result)` Method
### General Notes
* It is the responsibility of the domain expert to verify the documents produced as it relates to the subject.
* We do validate that these documents are valid json in our ingestible schema.

#### Parameters
* `final_result` (`object`) must meet the following json schema:  
```
{
    "definitions": {},
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "required": ["data", "row_id"],
    "properties": {
        "data": {
            "$id": "#/properties/data",
            "type": "object",
        },
        "row_id": {
            "$id": "#/properties/row_id",
            "type": "string",
            "default": "",
            "examples": [""],
            "pattern": "^(.*)$"
        },
        "geometry": {
            "$id": "#/properties/geometry/properties/geometry",
            "type": "object",
            "required": ["type", "coordinates", "crs"],
            "properties": {
                "type": {
                    "$id": "#/properties/geometry/properties/geometry/properties/type",
                    "type": "string",
                    "default": "",
                    "examples": [""],
                    "pattern": "^(.*)$"
                },
                "coordinates": {
                    "$id": "#/properties/geometry/properties/geometry/properties/coordinates",
                },
                "crs": {
                    "$id": "#/properties/crs",
                    "type": "object",
                    "title": "The Crs Schema",
                    "required": [
                        "type",
                        "properties"
                    ],
                    "properties": {
                        "type": {
                            "$id": "#/properties/crs/properties/type",
                            "type": "string",
                            "title": "The Type Schema",
                            "default": "",
                            "examples": [
                                "name"
                            ],
                            "pattern": "^(.*)$"
                        },
                        "properties": {
                            "$id": "#/properties/crs/properties/properties",
                            "type": "object",
                            "title": "The Properties Schema",
                            "required": [
                                "name"
                            ],
                            "properties": {
                                "name": {
                                    "$id": "#/properties/crs/properties/properties/properties/name",
                                    "type": "string",
                                    "title": "The Name Schema",
                                    "default": "",
                                    "examples": [
                                        "EPSG:3857"
                                    ],
                                    "pattern": "^(.*)$"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```
_When a json schema is provided the `data` property must match that schema_

#### Returns
`None` or json schema validation error

## `send_to_stage(data, stage)` Method
#### Parameters
* `data` any type, this will be passed to the next stage
* `stage` not used currently
