<?

	if (!defined('N')) {
		define('N', "\n");
	}

class mail{
	private $destinations = array();
	private $addresser = '';
	private $addresser_mail = 'admin@localhost';
	private $content = '';
	private $attaches = array();
	private $subject = '(Без темы)';
	
	public function appendDestination($mail) // Добавить адресата
	{
		if (!in_array($mail, $this->destinations)) {
			$this->destinations[] = $mail;
			return (count($this->destinations) - 1);
		}
		else {
			return false;
		}
	}
	
	public function removeDestination($mail) // Удалить адресата
	{
		foreach ($this->destinations as $key => $value) {
			if ($mail == $value) {
				unset($this->destinations[$key]);
				return true;
			}
		}
		return false;
	}
	
	public function setSubject($subject) // Установить тему
	{
		$this->subject = $subject;
	}
	
	public function setAddresser($addresser) // Установить отправителя
	{
		$this->addresser = $addresser;
	}
	
	public function setAddresserMail($mail) // Установить адрес отправителя
	{
		$this->addresser_mail = $mail;
	}
	
	public function setContent($content) // Установить содержание
	{
		$this->content = $content;
	}
	
	public function attacheFile($file_path) // Прикрепить файл
	{
		if (!in_array($file_path, $this->attaches)) {
			if (file_exists($file_path)) {
				$this->attaches[] = $file_path;
				return (count($this->attaches) - 1);
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	private function code($string)
	{
		return '=?UTF-8?B?'.base64_encode($string).'?=';
	}
	
	public function send() // Отправить
	{
		$mime_array = array('png'  => 'image/png',
		                    'gif'  => 'image/gif',
		                    'jpg'  => 'image/jpeg',
		                    'jpeg' => 'image/jpeg',
		                    'rar'  => 'application/x-rar-compressed',
		                    'zip'  => 'application/x-zip-compressed',
		                    'pdf'  => 'application/pdf',
		                    );
		$destinations = implode(', ', $this->destinations);
		$semi_rand = md5(time());
		$mime_boundary = md5(time());
		//$headers = 'From: '.self::code($this->addresser).' <'.$this->addresser_mail.'>'.N;
		$headers .= 'MIME-Version: 1.0'.N;
		if (count($this->attaches) == 0) {
			$headers .= 'Content-Type: text/html; charset=utf-8'.N;
			if (@mail($destinations, $this->subject, $this->content, $headers)){
				return true;
			}
			else {
				return false;
			}
		}
		else {
			$headers .= 'Content-Type: multipart/mixed; boundary='.$mime_boundary."\n\n";
			$message  = '--'.$mime_boundary.N;
			$message .= 'Content-Type: text/html; charset=utf-8'.N;
			$message .= 'Content-Transfer-Encoding: 8bit'."\n\n";
			$message .= $this->content."\n\n";
			foreach ($this->attaches as $file) {
				$message .= '--'.$mime_boundary.N;
				$fp = @fopen($file, 'rb');
				$data = @fread($fp, filesize($file));
				$data = chunk_split(base64_encode($data));
				$message .= 'Content-Type: image/png; name="'.basename($file).'"'.N;
				$message .= 'Content-Description: '.basename($file).N;
				$message .= 'Content-Disposition: attachment;'.N.' filename="'.basename($file).'"; size='.filesize($file).';'.N; 
				$message .= 'Content-Transfer-Encoding: base64'."\n\n".$data."\n\n";
			}
			$message .= '--'.$mime_boundary.'--'."\n\n";
			if (@mail($destinations, $this->subject, $message, $headers)){
				return true;
			}
			else {
				return false;
			}
		}
		
	}
}
$_POST['name'] = htmlspecialchars($_POST['name']);
$_POST['phone'] = htmlspecialchars($_POST['phone']);
$_POST['product_order'] = htmlspecialchars($_POST['product_order']);
$_POST['mail'] = htmlspecialchars($_POST['mail']);
$mail= new mail;

$html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=koi8-r" /><title></title></head><body>
<div class="letter">
    <p>Сообщение от: '.$_POST['name'].'</p>
    <p>Телефон: '.$_POST['phone'].'</p>
    <p>Mail: '.$_POST['mail'].'</p>
    <p>Тип товара: '.$_POST['product_order'].'</p>
</div></body></html>';
$mail->appendDestination('a.a.ivchenko@gmail.com');
$mail->setSubject('derevo@mail.ru');
$mail->setAddresserMail($_POST['mail']);
$mail->setAddresser('derevo');
$mail->setContent($html);
$mail->send(); 
