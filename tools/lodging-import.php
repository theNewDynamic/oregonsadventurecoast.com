<?php

// Read csv file
$row = 1;
$filesWritten = 0;
if (($handle = fopen("lodging.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $num = count($data);
        echo "$num fields in line $row: <br />\n";
        $fileData = '';

        if ($row != 1) {
            for ($c=0; $c < $num; $c++) {
                //echo $data[$c] . "<br />\n";
                $fileData = $fileData . create_md_string($data[$c], $c);
            }

            // Add --- marks
            $fileData = "---" . $fileData . "\n---";

            // Write data file
            write_data_file($data[0] . ".md", $fileData);

            echo "wrote data file: " . $data[0] . ".md<br>\n";
            $filesWritten++;
        }

        $row++;
    }
    fclose($handle);
    echo "Wrote a total of: " . $filesWritten . " files<br>\n";
}

// Create .md string
// page-id,photo-name,photo-alt,property-name,property-category,street1,street2,city,state,zip,phone-toll-free,phone-local,units,cost,location-description,website,amenities,
function create_md_string($data, $cellNum) {
    switch ($cellNum) {
        case 1:
            return create_photo_name($data);
            break;
        case 2:
            return create_photo_alt($data);
            break;
        case 3:
            return create_title($data);
            break;
        case 4:
            return create_property_category($data);
            break;
        case 5:
            return create_street($data);
            break;
        case 6:
            return create_street2($data);
            break;
        case 7:
            return create_city($data);
            break;
        case 8:
            return create_state($data);
            break;
        case 9:
            return create_zip($data);
            break;
        case 10:
            return create_phone_toll_free($data);
            break;
        case 11:
            return create_phone_local($data);
            break;
        case 12:
            return create_units($data);
            break;
        case 13:
            return create_cost($data);
            break;
        case 14:
            return create_location_description($data);
            break;
        case 15:
            return create_website($data);
            break;
        case 16:
            return create_amenities($data);
            break;
        
        default:
            return '';
            break;
    }
}


function create_photo_name($data) {
    return "\nphoto_name: /img/" . $data;
}
function create_photo_alt($data) {
    return "\nphoto_alt: " . $data;
}
function create_title($data) {
    return "\ntitle: " . $data . "\nproperty_name: " . $data;
}
function create_property_category($data) {
    return "\nproperty_category: '" . $data . "'";
}
function create_street($data) {
    return "\naddress:\n" . "  street: " . $data;
}
function create_street2($data) {
    return "\n  street2: " . $data;
}
function create_city($data) {
    return "\n  city: " . $data;
}
function create_state($data) {
    return "\n  state: " . $data;
}
function create_zip($data) {
    return "\n  zip: '" . $data . "'";
}
function create_phone_toll_free($data) {
    return "\nphone_toll_free: " . $data;
}
function create_phone_local($data) {
    return "\nphone_local: " . $data;
}
function create_units($data) {
    return "\nunits: '" . $data . "'";
}
function create_cost($data) {
    return "\ncost: '" . $data . "'";
}
function create_location_description($data) {
    return "\nproperty_description: >-\n  " . $data;
}
function create_website($data) {
    return "\nwebsite: '" . $data . "'";
}
function create_amenities($data) {
    $amenities = explode(',', $data);
    $amenityList = '';

    foreach($amenities as $amenity) {
        $amenityList = $amenityList . "\n  - amenitySelect: '" . $amenity . "'";
    }

    return "\namenityList: " . $amenityList;
}

// Write file
function write_data_file($filename, $data) {
    if ( $data ) {
        $file_handle = fopen("./data/" . $filename, "w");
        fwrite($file_handle, $data);
        fclose($file_handle);
    }
}