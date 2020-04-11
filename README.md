# Phaser Demos

[https://phaser.io/](https://phaser.io/)


## On Raspbian Server

Make sure php and apache are installed (along with other libs)

```bash
sudo apt install -y php php-sqlite3 apache2 supervisor npm git vim
```

### setup git if needed

```bash
git config --global user.email "your_email@example.com"
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
cat < ~/.ssh/id_rsa.pub
# paste into github
# https://github.com/settings/keys
```

### apache mods

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```


