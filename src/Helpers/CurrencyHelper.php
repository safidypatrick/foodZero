<?php
namespace App\Helpers;

class CurrencyHelper {
    public static function format($value) {
        $value = explode("MGA", $value);
        $formatted = str_replace(" ", "", trim(@$value[0]));

        return (int)$formatted;
    }

    public static function convertToLetter($number) {
		$convert = explode('.', $number);    
		$num[17] = array('zero', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit',
						 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize');
						  
		$num[100] = array(20 => 'vingt', 30 => 'trente', 40 => 'quarante', 50 => 'cinquante',
						  60 => 'soixante', 70 => 'soixante-dix', 80 => 'quatre-vingt', 90 => 'quatre-vingt-dix');
										  
		if (isset($convert[1]) && $convert[1] != '') {
		  
		  if($convert[1][0] == 0 || strlen($convert[1]) > 1){
			$convert[1] = (int) $convert[1];    
		  }else{
			$convert[1] = (int) ($convert[1].'0');   
		  }
	
		  return self::convertToLetter($convert[0]).'$$$'.self::convertToLetter( $convert[1]);
		}
		if ($number < 0) return 'moins '.self::convertToLetter(-$number);
		if ($number < 17) {
		  return $num[17][$number];
		}
		elseif ($number < 20) {
		  return 'dix-'.self::convertToLetter($number-10);
		}
		elseif ($number < 100) {
		  if ($number%10 == 0) {
			return $num[100][$number];
		  }
		  elseif (substr($number, -1) == 1) {
			if( ((int)($number/10)*10)<70 ){
			  return self::convertToLetter((int)($number/10)*10).'-et-un';
			}
			elseif ($number == 71) {
			  return 'soixante-et-onze';
			}
			elseif ($number == 81) {
			  return 'quatre-vingt-un';
			}
			elseif ($number == 91) {
			  return 'quatre-vingt-onze';
			}
		  }
		  elseif ($number < 70) {
			return self::convertToLetter($number-$number%10).'-'.self::convertToLetter($number%10);
		  }
		  elseif ($number < 80) {
			return self::convertToLetter(60).'-'.self::convertToLetter($number%20);
		  }
		  else {
			return self::convertToLetter(80).'-'.self::convertToLetter($number%20);
		  }
		}
		elseif ($number == 100) {
		  return 'cent';
		}
		elseif ($number < 200) {
		  return self::convertToLetter(100).' '.self::convertToLetter($number%100);
		}
		elseif ($number < 1000) {
		  return self::convertToLetter((int)($number/100)).' '.self::convertToLetter(100).($number%100 > 0 ? ' '.self::convertToLetter($number%100): '');
		}
		elseif ($number == 1000){
		  return 'mille';
		}
		elseif ($number < 2000) {
		  return self::convertToLetter(1000).' '.self::convertToLetter($number%1000).' ';
		}
		elseif ($number < 1000000) {
		  return self::convertToLetter((int)($number/1000)).' '.self::convertToLetter(1000).($number%1000 > 0 ? ' '.self::convertToLetter($number%1000): '');
		}
		elseif ($number == 1000000) {
		  return 'million';
		}
		elseif ($number < 2000000) {
		  return self::convertToLetter(1000000).' '.self::convertToLetter($number%1000000);
		}
		elseif ($number < 1000000000) {
		  return self::convertToLetter((int)($number/1000000)).' '.self::convertToLetter(1000000).($number%1000000 > 0 ? ' '.self::convertToLetter($number%1000000): '');
		}
	}
}