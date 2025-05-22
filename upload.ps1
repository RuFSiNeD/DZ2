$ftp = "ftp://rufsi.su/"
$user = "root"
$pass = "80caKUlxigGs"
$file = "site.tar.gz"

$webclient = New-Object System.Net.WebClient
$webclient.Credentials = New-Object System.Net.NetworkCredential($user, $pass)
$webclient.UploadFile($ftp + $file, $file) 