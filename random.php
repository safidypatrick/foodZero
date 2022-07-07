<?php
    $code = mt_rand() * date('Ymd');
    echo substr((string)$code, 0, 15);